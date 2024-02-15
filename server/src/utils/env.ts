export function envIsTrue(envName: string) {
  return (process.env[envName] || '').toLowerCase() === 'true'
}
