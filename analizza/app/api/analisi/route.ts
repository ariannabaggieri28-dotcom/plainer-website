import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/**
 * La pipeline di analisi (upload -> validazione file -> estrazione ->
 * benchmark -> report) arriva con le sessioni di build 1-5 del prompt in
 * docs/. Qui c'e' solo il kill switch: finché ANALYSIS_ENABLED non è
 * 'true', la route risponde che il servizio non è ancora aperto.
 */
export async function POST() {
  if (process.env.ANALYSIS_ENABLED !== 'true') {
    return NextResponse.json(
      { errore: 'Il servizio non è ancora aperto. Lasciaci la mail e ti avvisiamo noi.' },
      { status: 503 },
    )
  }
  return NextResponse.json({ errore: 'Non ancora implementato' }, { status: 501 })
}
