
import React, { useState } from 'react';
import { UserRole } from '../types';

interface TimelineProps {
  role: UserRole;
}

const Timeline: React.FC<TimelineProps> = ({ role }) => {
  const isPro = role === UserRole.PROFESSIONISTI;
  const [activeStep, setActiveStep] = useState(1);
  const [approved, setApproved] = useState(false);

  const steps = [
    {
      id: 0,
      label: "Avvio",
      status: "In regola",
      message: "Tutto pronto. I documenti sono stati verificati e il cantiere è in sicurezza.",
      content: "La fase di preparazione è conclusa. Il team ha ricevuto il via libera tecnico.",
      time: "Lunedì"
    },
    {
      id: 1,
      label: "Cantiere",
      status: "Attivo",
      message: "Strutture rimosse. Stiamo preparando il tracciamento degli impianti.",
      content: "Le demolizioni sono state eseguite con precisione. Area pulita e pronta per il prossimo step.",
      hasImage: true,
      time: "Oggi"
    },
    {
      id: 2,
      label: "Impianti",
      status: "Check-in",
      message: "Update: È necessaria una piccola integrazione per i punti luce in zona living.",
      content: "Abbiamo rilevato un'opportunità per migliorare l'illuminazione. Vedi la variante qui sotto.",
      isVariant: true,
      price: "€140",
      time: "14:30"
    },
    {
      id: 3,
      label: "Consegna",
      status: "Prossimamente",
      message: "Materiali in viaggio. La posa dei pavimenti inizierà martedì prossimo.",
      content: "Stiamo coordinando gli arrivi. La qualità dei marmi è stata certificata all'origine.",
      time: "Sett. +1"
    }
  ];

  return (
    <section className={`py-24 md:py-40 px-6 transition-colors duration-500 border-t ${isPro ? 'bg-[#0A0A0A] text-white border-white/5' : 'bg-white text-black border-black/5'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="text-[10px] font-black text-plainer uppercase tracking-[0.4em] mb-6 block">Monitoraggio Live</span>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
            Il cuore del cantiere. Nelle tue mani.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Interactive Stepper */}
          <div className="lg:col-span-4 flex flex-col gap-4 relative">
            <div className={`absolute left-[38px] top-10 bottom-10 w-[1px] ${isPro ? 'bg-white/5' : 'bg-black/5'}`}></div>
            
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`group w-full flex items-center gap-6 p-6 transition-all duration-300 rounded-2xl text-left relative z-10 ${
                  activeStep === step.id 
                    ? (isPro ? 'bg-white/5 shadow-2xl ring-1 ring-white/10' : 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] ring-1 ring-black/5 scale-[1.02]') 
                    : 'opacity-40 hover:opacity-100 hover:translate-x-1'
                }`}
              >
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                  activeStep === step.id 
                    ? 'bg-plainer border-plainer shadow-[0_0_20px_rgba(0,68,241,0.4)]' 
                    : step.id < activeStep ? 'bg-black border-black' : isPro ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-black/10'
                }`}>
                  {step.id < activeStep ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  ) : (
                    <span className={`text-xs font-black ${activeStep === step.id ? 'text-white' : ''}`}>{step.id + 1}</span>
                  )}
                </div>
                <div>
                  <p className={`text-[9px] font-black uppercase tracking-widest mb-0.5 ${activeStep === step.id ? 'text-plainer' : 'opacity-40'}`}>
                    {step.status}
                  </p>
                  <h3 className="text-lg font-black tracking-tight">{step.label}</h3>
                </div>
              </button>
            ))}
          </div>

          {/* Dynamic Feed Content */}
          <div className="lg:col-span-8 h-full">
            <div className={`p-8 md:p-16 border min-h-[600px] flex flex-col justify-between shadow-2xl rounded-3xl transition-all duration-500 ${
              isPro ? 'bg-zinc-900 border-white/10' : 'bg-gray-50 border-black/5'
            }`}>
              <div className="relative">
                {/* Visual Message Card */}
                <div className="flex items-start gap-4 mb-12 animate-in fade-in slide-in-from-left-4 duration-500">
                   <div className="w-12 h-12 bg-plainer text-white flex items-center justify-center font-black text-xs rounded-full">
                      {isPro ? "CL" : "IM"}
                   </div>
                   <div className={`p-6 rounded-2xl rounded-tl-none shadow-sm max-w-lg ${isPro ? 'bg-black/40 border border-white/10' : 'bg-white border border-black/5'}`}>
                      <p className="text-lg font-bold leading-tight mb-2 italic">
                        "{steps[activeStep].message}"
                      </p>
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-30">{steps[activeStep].time} • Messaggio certificato</span>
                   </div>
                </div>

                <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <h4 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">
                    {steps[activeStep].label}
                  </h4>
                  <p className={`text-xl md:text-2xl font-medium leading-relaxed max-w-2xl ${isPro ? 'text-gray-400' : 'text-gray-500'}`}>
                    {steps[activeStep].content}
                  </p>
                </div>

                {/* Conditional Visuals */}
                {steps[activeStep].hasImage && (
                  <div className="grid grid-cols-2 gap-4 mb-8 animate-in zoom-in-95 duration-700">
                     <div className="aspect-video bg-zinc-200 rounded-xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     </div>
                     <div className="aspect-video bg-zinc-300 rounded-xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     </div>
                  </div>
                )}

                {steps[activeStep].isVariant && (
                  <div className={`p-8 rounded-2xl border-2 transition-all duration-500 ${approved ? 'border-green-500 bg-green-500/5' : 'border-plainer bg-plainer/5'}`}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                       <div className="text-center md:text-left">
                          <p className="text-[10px] font-black text-plainer uppercase tracking-widest mb-1">Richiesta di Variazione</p>
                          <p className="text-4xl font-black tracking-tighter">{steps[activeStep].price}</p>
                       </div>
                       {approved ? (
                         <div className="bg-green-500 text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            Approvato con Firma Digitale
                         </div>
                       ) : (
                         <button 
                           onClick={() => setApproved(true)}
                           className="bg-black text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-plainer transition-all shadow-lg active:scale-95"
                         >
                           Conferma e Sblocca Fondi
                         </button>
                       )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-16 pt-8 border-t border-current opacity-10 flex justify-between text-[9px] font-black uppercase tracking-widest">
                <span>Plainer Engine v5.0</span>
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  Sincronizzato
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
