/**
 * Learn from VITE
 *
 * https://github.com/vitejs/vite/blob/df8f5a50e6fde343653ee6b2ceaa42583ff33ebc/packages/vite/src/node/env.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'dotenv'
import { expand } from 'dotenv-expand'

function arraify<T>(target: T | T[]): T[] {
  return Array.isArray(target) ? target : [target]
}

function tryStatSync(file: string): fs.Stats | undefined {
  try {
    // The "throwIfNoEntry" is a performance optimization for cases where the file does not exist
    return fs.statSync(file, { throwIfNoEntry: false })
  } catch {
    // Ignore errors
  }
}

function getEnvFilesForMode(mode: string, envDir: string): string[] {
  return [
    /** default file */ `.env`,
    /** local file */ `.env.local`,
    /** mode file */ `.env.${mode}`,
    /** mode local file */ `.env.${mode}.local`
  ].map((file) => path.join(envDir, file))
}

export function loadEnv(
  mode: string,
  envDir: string,
  prefixes: string | string[] = 'VITE_'
): Record<string, string> {
  if (mode === 'local') {
    throw new Error(
      `"local" cannot be used as a mode name because it conflicts with ` +
        `the .local postfix for .env files.`
    )
  }
  prefixes = arraify(prefixes)
  const env: Record<string, string> = {}
  const envFiles = getEnvFilesForMode(mode, envDir)

  const parsed = Object.fromEntries(
    envFiles.flatMap((filePath) => {
      if (!tryStatSync(filePath)?.isFile()) return []

      return Object.entries(parse(fs.readFileSync(filePath)))
    })
  )

  // test NODE_ENV override before expand as otherwise process.env.NODE_ENV would override this
  if (parsed.NODE_ENV && process.env.VITE_USER_NODE_ENV === undefined) {
    process.env.VITE_USER_NODE_ENV = parsed.NODE_ENV
  }
  // support BROWSER and BROWSER_ARGS env variables
  if (parsed.BROWSER && process.env.BROWSER === undefined) {
    process.env.BROWSER = parsed.BROWSER
  }
  if (parsed.BROWSER_ARGS && process.env.BROWSER_ARGS === undefined) {
    process.env.BROWSER_ARGS = parsed.BROWSER_ARGS
  }

  // let environment variables use each other
  // `expand` patched in patches/dotenv-expand@9.0.0.patch
  expand({ parsed })

  // only keys that start with prefix are exposed to client
  for (const [key, value] of Object.entries(parsed)) {
    if (prefixes.some((prefix) => key.startsWith(prefix))) {
      env[key] = value
    }
  }

  // check if there are actual env variables starting with VITE_*
  // these are typically provided inline and should be prioritized
  for (const key in process.env) {
    if (prefixes.some((prefix) => key.startsWith(prefix))) {
      env[key] = process.env[key] as string
    }
  }

  return env
}

// export function resolveEnvPrefix({
//   envPrefix = "VITE_",
// }): string[] {
//   envPrefix = arraify(envPrefix);
//   if (envPrefix.includes("")) {
//     throw new Error(
//       `envPrefix option contains value '', which could lead unexpected exposure of sensitive information.`
//     );
//   }
//   return envPrefix;
// }
