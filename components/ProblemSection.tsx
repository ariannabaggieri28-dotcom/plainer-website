
import React from 'react';
import { UserRole } from '../types';

interface ProblemSectionProps {
  role: UserRole;
}

const ProblemSection: React.FC<ProblemSectionProps> = ({ role }) => {
  const isPro = role === UserRole.PROFESSIONISTI;
  const problems = role === UserRole.PRIVATI ? [
    { title: "Confusione", desc: "Non sapere da dove iniziare né quanto costerà davvero." },
    { title: "Mancanza di fiducia", desc: "La paura di essere raggirati o di scegliere la persona sbagliata." },
    { title: "Costi nascosti", desc: "Sorprese nel budget che spuntano a metà cantiere." },
    { title: "Strumenti frammentati", desc: "Email, WhatsApp, file cartacei. Nulla è mai dove serve." }
  ] : [
    { title: "Tempo sprecato", desc: "Ore passate a fare sopralluoghi e preventivi per clienti indecisi." },
    { title: "Lead di bassa qualità", desc: "Richieste vaghe e fuori budget che non portano a nulla." },
    { title: "Guerra dei prezzi", desc: "Competere solo sul prezzo senza poter dimostrare il valore." },
    { title: "Mancanza di visibilità", desc: "Difficoltà a mostrare la propria professionalità in modo strutturato." }
  ];

  return (
    <section className={`py-24 md:py-48 px-6 transition-colors duration-500 ${isPro ? 'bg-[#0A0A0A] text-white border-t border-white/5' : 'bg-white text-black border-t border-black/5'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] mb-10">
              Il settore è rotto.<br/><span className="text-plainer">Lo stiamo riparando.</span>
            </h2>
            <div className="space-y-6">
               <p className={`text-2xl leading-tight font-bold ${isPro ? 'text-white' : 'text-black'}`}>
                 "La ristrutturazione è spesso descritta come l'evento più stressante nella vita."
               </p>
               <p className={`text-xl font-medium ${isPro ? 'text-gray-500' : 'text-gray-400'}`}>
                 In Plainer abbiamo analizzato migliaia di cantieri per capire dove nascono i conflitti e come risolverli.
               </p>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
            {problems.map((p, idx) => (
              <div key={idx} className="group">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`text-xs font-black w-8 h-8 flex items-center justify-center ${isPro ? 'bg-white text-black' : 'bg-black text-white'}`}>0{idx+1}</span>
                  <div className={`h-px flex-grow ${isPro ? 'bg-white/10' : 'bg-black/10'}`}></div>
                </div>
                <h3 className="text-2xl font-black mb-3 group-hover:text-plainer transition-colors">{p.title}</h3>
                <p className={`font-medium leading-relaxed ${isPro ? 'text-gray-500' : 'text-gray-400'}`}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
