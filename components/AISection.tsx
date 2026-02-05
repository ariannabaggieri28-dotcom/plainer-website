
import React from 'react';
import { UserRole } from '../types';

interface AISectionProps {
  role: UserRole;
}

const AISection: React.FC<AISectionProps> = ({ role }) => {
  const isPrivati = role === UserRole.PRIVATI;

  return (
    <section className="py-24 md:py-48 px-6 bg-plainer text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 pointer-events-none skew-x-12"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <span className="inline-block px-4 py-1 border border-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Neural Analysis Engine</span>
          <h2 className="text-5xl md:text-[76px] font-black leading-[0.9] mb-12 tracking-tighter">
            Analisi. Precisione. Sicurezza.
          </h2>
          
          <div className="space-y-16">
            <div>
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Analisi Strutturale</h3>
              <p className="text-xl text-white/70 leading-relaxed font-medium">
                {isPrivati 
                  ? "Attraverso l'elaborazione computerizzata delle planimetrie, Plainer identifica automaticamente le criticità tecniche e propone la sequenza operativa ottimale per il tuo progetto."
                  : "Riduci i tempi di analisi lead del 90%. Il nostro motore AI estrae quantità e requisiti tecnici complessi da planimetrie e foto, validando istantaneamente la fattibilità del progetto."}
              </p>
            </div>
            
            <div className="p-10 bg-white/5 border border-white/10 backdrop-blur-lg">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-4 uppercase tracking-tight">
                 <div className="w-1.5 h-6 bg-white"></div>
                 Computo Metrico Predittivo
              </h3>
              <p className="text-lg text-white/80 leading-relaxed font-medium">
                {isPrivati 
                  ? "Generiamo un documento tecnico analitico basato sui prezzi di mercato correnti. Avrai la certezza di ricevere preventivi uniformi, trasparenti e privi di voci ambigue."
                  : "Redigi offerte tecniche impeccabili in pochi minuti. L'AI genera la struttura del computo metrico basandosi sui rilievi digitali, azzerando il rischio di errori di quotazione."}
              </p>
            </div>
          </div>
        </div>

        {/* AI Visual - Apple Style White Card */}
        <div className="relative">
          <div className="bg-white p-10 md:p-16 border border-black/5 shadow-[0_40px_100px_rgba(0,0,0,0.2)] rounded-[2.5rem] relative overflow-hidden text-black">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-plainer/20 to-transparent"></div>
            
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-black/5">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 italic">Draft Analysis v5.0</span>
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-plainer animate-pulse"></div>
                 <span className="text-[10px] font-black tracking-widest text-plainer">LIVE SCANNING</span>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 bg-gray-50 border border-black/5 rounded-2xl">
                <p className="text-[9px] text-black/30 uppercase font-black mb-6 tracking-[0.3em]">Engineering Summary</p>
                <div className="space-y-5">
                   <div className="flex justify-between items-center text-sm border-b border-black/5 pb-2">
                      <span className="font-medium opacity-60">Demolizione pareti interne</span>
                      <span className="font-black text-plainer tracking-tighter">42.50 mq</span>
                   </div>
                   <div className="flex justify-between items-center text-sm border-b border-black/5 pb-2">
                      <span className="font-medium opacity-60">Posa massetto cementizio</span>
                      <span className="font-black text-plainer tracking-tighter">112.00 mq</span>
                   </div>
                   <div className="flex justify-between items-center text-sm border-b border-black/5 pb-2">
                      <span className="font-medium opacity-60">Impianto idrico Bagno 1</span>
                      <span className="font-black text-plainer tracking-tighter">1.00 ud</span>
                   </div>
                   <div className="h-1 bg-black/5 w-full mt-10 rounded-full overflow-hidden">
                      <div className="h-full bg-plainer w-[88%] transition-all duration-1000"></div>
                   </div>
                </div>
              </div>
              
              <div className="p-8 border border-plainer/20 bg-plainer/5 rounded-2xl">
                <p className="text-[10px] font-black mb-4 flex items-center gap-3 tracking-widest uppercase text-plainer">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                   {isPrivati ? "Opportunità Fiscale" : "Marginalità Stimata"}
                </p>
                <p className="text-sm leading-relaxed opacity-70 font-bold italic">
                  {isPrivati 
                    ? "Integrazione rilevata: il progetto soddisfa i requisiti per l'Ecobonus (65%). Risparmio fiscale proiettato: €14.850."
                    : "Analisi computo: l'ottimizzazione logistica dei materiali rilevata dall'AI permette un incremento del margine del 4.2%."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
