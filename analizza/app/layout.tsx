import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Analizza il tuo preventivo — Plainer',
  description:
    'Carica il preventivo della tua ristrutturazione: Plainer lo legge, segnala le voci vaghe e lo confronta con i prezzi reali della tua provincia.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
