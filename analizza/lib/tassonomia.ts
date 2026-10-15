/**
 * La tassonomia fissa delle voci di preventivo. L'estrazione mappa ogni voce
 * su UNA di queste categorie: e' quello che rende confrontabili preventivi
 * scritti in mille modi diversi, ed e' la chiave del benchmark per provincia.
 */
export const CATEGORIE = [
  'demolizioni_rimozioni',
  'impianto_idraulico',
  'impianto_elettrico',
  'impianto_riscaldamento',
  'massetti_sottofondi',
  'impermeabilizzazioni',
  'rivestimenti_pavimenti',
  'sanitari_rubinetteria',
  'opere_murarie',
  'serramenti',
  'tinteggiature_finiture',
  'oneri_smaltimento_sicurezza',
] as const

export type Categoria = (typeof CATEGORIE)[number]

export const UNITA = ['mq', 'ml', 'cad', 'corpo', 'h', 'kg', 'mc'] as const
export type Unita = (typeof UNITA)[number]

/**
 * Dizionario delle voci vaghe: formule che nei preventivi nascondono costi o
 * responsabilita'. L'analisi le segnala sempre, qualunque sia il prezzo.
 */
export const VOCI_VAGHE: { pattern: RegExp; perche: string }[] = [
  {
    pattern: /\ba\s+corpo\b/i,
    perche: 'Prezzo "a corpo" senza quantità: impossibile verificare cosa comprende.',
  },
  {
    pattern: /\bopere\s+(?:varie|accessorie|complementari)\b/i,
    perche: 'Voce generica: non si sa quali lavorazioni copra davvero.',
  },
  {
    pattern: /\b(?:eventuali|extra|imprevisti)\b/i,
    perche: 'Apre a costi aggiuntivi non quantificati.',
  },
  {
    pattern: /\bescluso?\s+(?:smaltimento|materiale|iva|opere\s+murarie|assistenze?)\b/i,
    perche: 'Esclusione che tornerà come costo a parte: va quantificata prima.',
  },
  {
    pattern: /\bsalvo\s+(?:verifica|conguaglio|misurazione)\b/i,
    perche: 'Il prezzo finale resta aperto.',
  },
  {
    pattern: /\bcompreso\s+quanto\s+(?:necessario|occorre)\b/i,
    perche: 'Formula onnicomprensiva che in cantiere non vincola a nulla.',
  },
  {
    pattern: /\bcome\s+da\s+(?:sopralluogo|accordi\s+verbali)\b/i,
    perche: 'Rimanda ad accordi non scritti: in caso di contestazione non esistono.',
  },
]

/** Lavorazioni che in un bagno completo devono esserci: se mancano, segnala. */
export const VOCI_ATTESE_BAGNO: { categoria: Categoria; nome: string }[] = [
  { categoria: 'impermeabilizzazioni', nome: 'Impermeabilizzazione doccia/pavimento' },
  { categoria: 'oneri_smaltimento_sicurezza', nome: 'Smaltimento macerie in discarica autorizzata' },
  { categoria: 'massetti_sottofondi', nome: 'Massetto o livellamento del fondo' },
]
