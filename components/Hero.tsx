
import React from 'react';
import { UserRole } from '../types';
import PlatformPreview from './PlatformPreview';

interface HeroProps {
  role: UserRole;
  onJoinBeta: () => void;
}

const Hero: React.FC<HeroProps> = ({ role, onJoinBeta }) => {
  const isPro = role === UserRole.PROFESSIONISTI;
  
  const content = {
    [UserRole.PRIVATI]: {
      label: "Standard di eccellenza",
      headline: "Ristrutturare casa non è mai stato così semplice.",
      subheadline: "Un'unica piattaforma per governare ogni fase del tuo progetto. Dalla verifica dei professionisti alla gestione dei pagamenti certificati."
    },
    [UserRole.PROFESSIONISTI]: {
      label: "Evoluzione professionale",
      headline: "Costruisci il tuo futuro. Al resto pensiamo noi.",
      subheadline: "Ottimizza il tuo workflow. Accedi a commesse qualificate, contratti digitali e flussi finanziari garantiti."
    }
  };

  return (
    <section className={`pt-32 pb-20 md:pt-48 md:pb-40 px-6 transition-colors duration-500 overflow-hidden ${isPro ? 'bg-[#0A0A0A] text-white' : 'bg-white text-black'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 z-10 relative">
            <span className="inline-block text-plainer font-black uppercase tracking-[0.3em] text-[10px] mb-6">
              {content[role].label}
            </span>
            <h1 className="text-5xl md:text-[86px] font-black tracking-tighter leading-[0.95] mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {content[role].headline}
            </h1>
            <p className={`text-xl md:text-2xl mb-14 leading-relaxed max-w-xl font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100 ${isPro ? 'text-gray-400' : 'text-gray-500'}`}>
              {content[role].subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <button 
                onClick={onJoinBeta}
                className="bg-plainer text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.25em] hover:bg-black transition-all shadow-2xl shadow-plainer/20 active:scale-95"
              >
                Inizia ora
              </button>
              <button 
                className={`px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.25em] border transition-all hover:bg-gray-100 active:scale-95 ${isPro ? 'border-white/20 hover:bg-white/10' : 'border-black/10'}`}
              >
                Scopri di più
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative animate-in fade-in zoom-in-95 duration-1000 delay-300">
             <PlatformPreview role={role} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
