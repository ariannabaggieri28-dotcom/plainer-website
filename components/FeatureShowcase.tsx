
import React from 'react';
import { UserRole } from '../types';

interface FeatureShowcaseProps {
  role: UserRole;
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ role }) => {
  const isPro = role === UserRole.PROFESSIONISTI;

  const features = role === UserRole.PRIVATI ? [
    {
      title: "Costi sotto controllo",
      desc: "Monitoraggio capillare dei flussi. I fondi vengono svincolati solo dopo la tua approvazione digitale.",
      ui: (
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
          <div className="text-[10px] font-black text-plainer mb-4 uppercase tracking-widest">Conto Protetto</div>
          <div className="text-4xl font-black mb-6 tracking-tighter">€24.150</div>
          <div className="space-y-3 opacity-60">
             <div className="flex justify-between text-[10px] font-black uppercase"><span>In deposito</span> <span>€18.000</span></div>
             <div className="flex justify-between text-[10px] font-black uppercase"><span>Inviati</span> <span>€6.150</span></div>
          </div>
        </div>
      )
    },
    {
      title: "Confronto Intelligente",
      desc: "Uniformiamo ogni preventivo tramite AI. Individua subito anomalie di prezzo o costi fuori mercato.",
      ui: (
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
           <div className="flex justify-between text-[10px] font-black uppercase mb-6 tracking-widest text-plainer">Analisi AI</div>
           <div className="space-y-3">
              <div className="h-1.5 w-full bg-gray-100 rounded-full"><div className="h-full bg-plainer w-full rounded-full"></div></div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full"><div className="h-full bg-plainer w-[70%] rounded-full"></div></div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full"><div className="h-full bg-plainer w-[85%] rounded-full"></div></div>
           </div>
        </div>
      )
    },
    {
      title: "Burocrazia Zero",
      desc: "Gestione automatizzata di detrazioni e pratiche. Ogni documento è archiviato e pronto per l'Agenzia delle Entrate.",
      ui: (
        <div className="bg-plainer/5 p-6 rounded-2xl border border-plainer/10">
          <div className="w-10 h-10 bg-plainer flex items-center justify-center text-white mb-4 rounded-xl shadow-lg">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <div className="text-[10px] font-black uppercase mb-1 tracking-widest text-plainer">Smart Archive</div>
          <p className="text-xs font-bold opacity-40">12 Documenti Validati</p>
        </div>
      )
    }
  ] : [
    {
      title: "Clienti Qualificati",
      desc: "Dì addio ai sopralluoghi a vuoto. Accedi solo a progetti con budget validato e brief tecnico completo.",
      ui: (
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
           <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-black text-plainer uppercase tracking-widest">Lead Certificato</span>
              <div className="w-2 h-2 bg-plainer rounded-full animate-pulse"></div>
           </div>
           <div className="text-xl font-black text-white mb-4 tracking-tight">Ristrutturazione 120mq</div>
           <button className="w-full py-3 bg-white text-black text-[10px] font-black uppercase rounded-full tracking-widest">Apri Brief Tecnico</button>
        </div>
      )
    },
    {
      title: "Pagamenti Certificati",
      desc: "I fondi per ogni fase sono bloccati in deposito prima dell'inizio. Incassa i compensi istantaneamente a lavoro concluso.",
      ui: (
        <div className="bg-plainer/10 p-6 rounded-2xl border border-plainer/20">
           <div className="text-[10px] font-black text-plainer mb-2 uppercase tracking-widest">Garantito</div>
           <div className="text-4xl font-black text-white mb-6 tracking-tighter">€18.400</div>
           <div className="flex gap-1 h-8 items-end opacity-20">
              {[60, 40, 80, 50, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-white rounded-t-sm" style={{height: `${h}%`}}></div>
              ))}
           </div>
        </div>
      )
    },
    {
      title: "Workflow Digitale",
      desc: "Firma varianti e SAL direttamente dallo smartphone. Ogni approvazione ha valore legale immediato e definitivo.",
      ui: (
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
           <div className="text-[10px] font-black uppercase mb-3 tracking-widest opacity-40">Approvazione Digitale</div>
           <div className="text-sm font-bold text-white mb-4 italic">"Variante Impianto VMC"</div>
           <div className="flex justify-between items-center">
              <span className="text-lg font-black text-white">+€1.200</span>
              <span className="text-[9px] font-black text-plainer uppercase px-2 py-1 bg-plainer/10 rounded">Certificato eIDAS</span>
           </div>
        </div>
      )
    }
  ];

  return (
    <section className={`py-24 md:py-48 px-6 transition-colors duration-500 ${isPro ? 'bg-[#0A0A0A] text-white border-t border-white/5' : 'bg-gray-50 text-black border-t border-black/5'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mb-32">
          <h2 className="text-4xl md:text-[80px] font-black tracking-tighter leading-[0.85] mb-12">
            {isPro ? "L'eccellenza. Senza ostacoli." : "Semplice. Come un tap."}
          </h2>
          <p className={`text-xl md:text-3xl font-medium leading-tight ${isPro ? 'text-gray-400' : 'text-gray-500'}`}>
            {isPro 
              ? "Plainer automatizza la burocrazia e mette al sicuro i tuoi incassi. Tu mettici la tua professionalità."
              : "Dimentica lo stress del cantiere. Gestisci preventivi, pagamenti e professionisti da un'unica piattaforma sicura."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className={`p-10 md:p-14 flex flex-col justify-between border rounded-[2.5rem] transition-all duration-500 ${isPro ? 'bg-zinc-900 border-white/10 hover:border-white/20' : 'bg-white border-black/5 shadow-sm hover:shadow-2xl hover:-translate-y-2'}`}>
              <div className="mb-16">
                <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{f.title}</h3>
                <p className={`leading-relaxed font-medium text-base ${isPro ? 'text-gray-500' : 'text-gray-400'}`}>{f.desc}</p>
              </div>
              <div className="w-full">
                {f.ui}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
