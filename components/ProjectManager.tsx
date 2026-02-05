
import React from 'react';
import { UserRole } from '../types';

interface ProjectManagerProps {
  role: UserRole;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ role }) => {
  const isPro = role === UserRole.PROFESSIONISTI;

  return (
    <section className={`py-24 md:py-48 px-6 transition-colors duration-500 ${isPro ? 'bg-[#0A0A0A] text-white border-t border-white/5' : 'bg-white text-black border-t border-black/5'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          
          <div className="lg:col-span-6">
            <span className="text-[10px] font-black text-plainer uppercase tracking-[0.4em] mb-6 block">Project Governance</span>
            <h2 className="text-4xl md:text-[80px] font-black tracking-tighter leading-[0.85] mb-12">
              {isPro ? "Tutto sotto controllo. Senza sforzo." : "Un progetto unico. O una collezione."}
            </h2>
            <p className={`text-xl md:text-2xl font-medium mb-14 leading-relaxed ${isPro ? 'text-gray-400' : 'text-gray-500'}`}>
              {isPro 
                ? "Gestisci l'intero pipeline di commesse in un'unica dashboard. Monitora scadenze, flussi di cassa e documenti tecnici per ogni cantiere attivo."
                : "Dalla tua residenza principale alla casa vacanze. Inizia ora il tuo primo progetto e gestisci ogni metro quadro con la precisione di un professionista."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-plainer text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl active:scale-95">
                Crea il tuo progetto
              </button>
              <button className={`px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] border transition-all active:scale-95 ${isPro ? 'border-white/20 hover:bg-white hover:text-black' : 'border-black/10 hover:bg-gray-100'}`}>
                Guarda come funziona
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            {/* Main Property Card */}
            <div className={`p-10 md:p-14 border shadow-2xl rounded-[2.5rem] transition-all duration-700 relative z-10 ${
              isPro ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/5 shadow-[0_40px_100px_rgba(0,0,0,0.06)]'
            }`}>
              <div className="flex justify-between items-start mb-12 border-b border-current pb-10 opacity-90">
                 <div>
                    <h3 className="text-3xl font-black tracking-tight mb-2">Appartamento Milano</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Progetto attivo • PL-2024-X</p>
                 </div>
                 <div className="text-right">
                    <span className="px-4 py-1.5 bg-plainer/10 text-plainer text-[10px] font-black uppercase tracking-widest rounded-full">
                       In Corso
                    </span>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-12 gap-x-8 mb-16">
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-30 mb-2">Superficie</p>
                    <p className="text-3xl font-black tracking-tighter">120 m²</p>
                 </div>
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-30 mb-2">Tipo Lavori</p>
                    <p className="text-xl font-black tracking-tight leading-tight uppercase">Ristrutturazione Totale</p>
                 </div>
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-30 mb-2">Investimento</p>
                    <p className="text-3xl font-black tracking-tighter text-plainer">€85.000</p>
                 </div>
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-30 mb-2">Pagamenti SAL</p>
                    <p className="text-xl font-black tracking-tight uppercase">4/6 Completati</p>
                 </div>
              </div>

              <div className="space-y-3">
                 <div className={`p-5 rounded-2xl border flex items-center justify-between transition-all hover:translate-x-1 ${isPro ? 'bg-black/40 border-white/5' : 'bg-gray-50 border-black/5'}`}>
                    <div className="flex items-center gap-4">
                       <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                       <span className="text-[10px] font-black uppercase tracking-widest">Documentazione CILAS</span>
                    </div>
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg>
                 </div>
                 <div className={`p-5 rounded-2xl border-2 border-dashed flex items-center justify-between opacity-30 cursor-pointer hover:opacity-100 transition-all ${isPro ? 'border-white/10' : 'border-black/10'}`}>
                    <span className="text-[10px] font-black uppercase tracking-widest">Aggiungi un altro progetto</span>
                    <span className="text-2xl font-light">+</span>
                 </div>
              </div>
            </div>
            
            {/* Background floating decor */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-plainer/10 -z-10 rounded-full blur-[80px]"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectManager;
