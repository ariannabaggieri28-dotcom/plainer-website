/**
 * Rilevamento e mascheramento dei dati personali nel testo dei preventivi.
 *
 * I pattern vengono da plainer-knowledge-ops (backend/app/services/pii_detector.py),
 * portati in TypeScript. Vanno applicati PRIMA di salvare qualunque voce in
 * quote_items: l'estratto per l'AI nasce gia' pulito, non viene ripulito dopo.
 */

type Pattern = { tipo: string; re: RegExp; maschera: string }

const PATTERN_PII: Pattern[] = [
  {
    tipo: 'codice_fiscale',
    re: /\b[A-Z]{6}\d{2}[ABCDEHLMPRST]\d{2}[A-Z]\d{3}[A-Z]\b/gi,
    maschera: '***CF***',
  },
  {
    tipo: 'iban',
    re: /\b[A-Z]{2}\d{2}[\s-]?[A-Z0-9]{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?[A-Z0-9]{0,14}\b/gi,
    maschera: '***IBAN***',
  },
  {
    tipo: 'email',
    re: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g,
    maschera: '***EMAIL***',
  },
  {
    tipo: 'partita_iva',
    re: /\b(?:P\.?\s?IVA|partita\s+iva)[:\s]*\d{11}\b/gi,
    maschera: '***PIVA***',
  },
  {
    tipo: 'telefono',
    // +39 opzionale, prefisso fisso o cellulare, 6-10 cifre. Il lookbehind
    // evita di mangiare pezzi di numeri piu' lunghi (es. importi senza spazi).
    re: /(?<!\d)(?:\+39[\s.-]?)?(?:(?:0\d{1,3}|3\d{2})[\s.-]?)\d{6,8}(?!\d)/g,
    maschera: '***TEL***',
  },
  {
    tipo: 'carta',
    re: /(?<!\d)\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}(?!\d)/g,
    maschera: '***CARTA***',
  },
]

// Vie e indirizzi: nelle voci di un preventivo l'indirizzo del cantiere e'
// un identificativo quasi diretto della persona. Via + civico sparisce.
const PATTERN_INDIRIZZO: RegExp =
  /\b(?:via|viale|piazza|piazzale|corso|largo|vicolo|strada)\s+[A-Za-zÀ-ú'. ]{2,40}?,?\s*(?:n\.?\s*)?\d{1,4}\b/gi

/** Maschera i dati personali in un testo. Ritorna il testo pulito. */
export function mascheraPii(testo: string): string {
  let pulito = testo
  for (const p of PATTERN_PII) pulito = pulito.replace(p.re, p.maschera)
  pulito = pulito.replace(PATTERN_INDIRIZZO, '***INDIRIZZO***')
  return pulito
}

/** True se il testo contiene ancora PII dopo la pulizia (cintura di sicurezza). */
export function contienePii(testo: string): boolean {
  if (PATTERN_INDIRIZZO.test(testo)) {
    PATTERN_INDIRIZZO.lastIndex = 0
    return true
  }
  PATTERN_INDIRIZZO.lastIndex = 0
  return PATTERN_PII.some((p) => {
    const hit = p.re.test(testo)
    p.re.lastIndex = 0
    return hit
  })
}

// ── Categorie particolari (GDPR art. 9): se compaiono, la voce NON entra
//    nell'estratto, nemmeno mascherata. ──────────────────────────────────
const PATTERN_SENSIBILI: RegExp[] = [
  /\b(diagnosi|patologia|malattia|referto|terapia|farmaco|medicinale|disabilità|invalidità|ricovero|cartella\s+clinica)\b/i,
  /\b(condannato|arrestato|imputato|procedimento\s+penale|reato|precedenti\s+penali)\b/i,
  /\b(orientamento\s+sessuale|credo\s+religioso|partito\s+politico|appartenenza\s+sindacale|etnia)\b/i,
]

export function contieneDatiSensibili(testo: string): boolean {
  return PATTERN_SENSIBILI.some((re) => re.test(testo))
}
