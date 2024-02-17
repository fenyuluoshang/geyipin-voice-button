import { generateKeyPairSync } from 'node:crypto'
import { existsSync } from 'node:fs'
import { writeFile, readFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import User from '@/models/user.model'
import { Service } from 'typedi'
import { sign, verify } from 'jsonwebtoken'

const DATA_DIR = path.resolve(__dirname, '../../')
const PRIVATE_KEY_LOCATION = path.resolve(DATA_DIR, 'data/jwt-key')
const PUBLIC_KEY_LOCATION = path.resolve(DATA_DIR, 'data/jwt-key.pub')
const RSA_KEY_PASS_PHRASE = 'tiancaige'

@Service()
class JWTServices {
  async generateKey() {
    const keyPair = await generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: RSA_KEY_PASS_PHRASE
      }
    })

    await Promise.all([
      writeFile(PRIVATE_KEY_LOCATION, keyPair.privateKey, { encoding: 'utf8' }),
      writeFile(PUBLIC_KEY_LOCATION, keyPair.publicKey, { encoding: 'utf8' })
    ])
  }

  async getKey() {
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR)
    }

    const exists = [existsSync(PRIVATE_KEY_LOCATION), existsSync(PUBLIC_KEY_LOCATION)]

    if (!exists[0] || !exists[1]) {
      await this.generateKey()
    }

    const keys = await Promise.all([
      readFile(PRIVATE_KEY_LOCATION, { encoding: 'utf8' }),
      readFile(PUBLIC_KEY_LOCATION, { encoding: 'utf8' })
    ])

    return {
      privateKey: keys[0],
      publicKey: keys[1]
    }
  }

  async makeJwt(user: User) {
    const keyPair = await this.getKey()
    const token = sign(
      {
        sub: user.id,
        // 1h
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        iat: Math.floor(Date.now() / 1000)
      },
      {
        key: keyPair.privateKey,
        passphrase: RSA_KEY_PASS_PHRASE
      },
      { algorithm: 'RS256' }
    )

    return token
  }

  async readJWT(jwt: string) {
    try {
      const now = Date.now()
      const keyPair = await this.getKey()
      const data = verify(jwt, {
        key: keyPair.publicKey,
        passphrase: RSA_KEY_PASS_PHRASE
      })

      if (typeof data !== 'string') {
        const uid = data.sub && Number(data.sub)
        if (uid && data.exp && data.exp * 1000 > now && (!data.nbf || data.nbf * 1000 < now)) {
          return uid
        }
      }
    } catch (_e: unknown) {
      return undefined
    }
  }
}

export default JWTServices
