import type { NextConfig } from 'next'

/**
 * Testate di sicurezza su tutto il sito. La CSP e' stretta come quella del
 * sito principale: nessun servizio terzo, tutto self-hosted. L'unica
 * connessione in uscita del browser e' verso le nostre API (self).
 */
const testate = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const config: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: testate }]
  },
}

export default config
