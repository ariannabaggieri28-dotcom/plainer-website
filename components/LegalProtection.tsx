
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LegalProtectionProps {
  role: UserRole;
}

const LegalProtection: React.FC<LegalProtectionProps> = ({ role }) => {
  const isPro = role === UserRole.PROFESSIONISTI;
  const [activeTier, setActiveTier] = useState(1);

  const legalTiers = [
    {
      title: "Base",
      subtitle: "Copertura Standard",
      description: "Il protocollo essenziale per ogni contratto di ristrutturazione.",
      features: ["Contratto Digitale eIDAS", "Piattaforma di Conciliazione", "Archivio Documentale Safe"],
      level: 1,
      badge: "Sempre Incluso"
    },
    {
      title: "Pro",
      subtitle: "Scudo Anti-Imprevisti",
      description: "La protezione completa che blocca i fondi e verifica ogni singola variante.",
      features: ["Gestione Pagamenti Escrow", "Validazione Varianti tramite AI", "Audit Indipendente di Conformità"],
      level: 2,
      badge: "Standard Plainer"
    },
    {
      title: "Advanced",
      subtitle: "Zero Rischi Totale",
      description: "Assistenza legale illimitata e pacchetto assicurativo integrato nel canone.",
      features: ["Tutela Legale Diretta 24/7", "Assicurazione CAR & Decennale", "Garanzia di Fine Lavori"],
      level: 3,
      badge: "Massima Tutela"
    }
  ];

  return (
    <section className={`py-24 md:py-48 px-6 transition-colors duration-500 border-t ${isPro ? 'bg-zinc-900 border-white/5 text-white' : 'bg-gray-50 border-black/5 text-black'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <div>
            <span className="text-[10px] font-black text-plainer uppercase tracking-[0.4em] mb-6 block">Legal Ecosystem</span>
            <h2 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-10">
              Inviolabile. Per definizione.
            </h2>
            <p className={`text-xl md:text-2xl font-medium leading-relaxed max-w-xl mb-12 ${isPro ? 'text-gray-400' : 'text-gray-500'}`}>
              Proteggiamo il tuo capitale e la tua serenità con protocolli di sicurezza digitali. Switcha tra i livelli per scoprire come blindiamo ogni fase.
            </p>
            
            <div className="flex gap-4">
              {legalTiers.map((tier, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTier(idx)}
                  className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest border transition-all ${
                    activeTier === idx 
                      ? 'bg-plainer border-plainer text-white shadow-lg' 
                      : isPro ? 'bg-black/40 border-white/10 hover:border-white/20' : 'bg-white border-black/5 hover:bg-gray-100'
                  }`}
                >
                  {tier.title}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Card Stack */}
          <div className="relative h-[550px] w-full max-w-lg mx-auto lg:ml-auto">
             {legalTiers.map((tier, idx) => {
               const offset = idx - activeTier;
               const isActive = idx === activeTier;
               
               return (
                 <div 
                   key={idx}
                   onClick={() => setActiveTier(idx)}
                   style={{
                     transform: `translateY(${offset * 12}px) scale(${1 - Math.abs(offset) * 0.05})`,
                     zIndex: 10 - Math.abs(offset),
                     opacity: isActive ? 1 : 0.4 - Math.abs(offset) * 0.1,
                     cursor: isActive ? 'default' : 'pointer'
                   }}
                   className={`absolute inset-0 p-12 transition-all duration-700 border flex flex-col justify-between rounded-[2rem] ${
                     isActive 
                       ? 'bg-plainer text-white border-plainer shadow-[0_40px_80px_rgba(0,68,241,0.2)]' 
                       : isPro ? 'bg-black border-white/10' : 'bg-white border-black/5'
                   }`}
                 >
                   <div>
                      <div className="flex justify-between items-start mb-10">
                         <div className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest border ${isActive ? 'border-white/30 text-white' : 'border-plainer/30 text-plainer'}`}>
                            {tier.badge}
                         </div>
                         <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className={`w-1 h-3 rounded-full ${i < tier.level ? (isActive ? 'bg-white' : 'bg-plainer') : (isActive ? 'bg-white/20' : 'bg-black/5')}`}></div>
                            ))}
                         </div>
                      </div>

                      <div className="mb-12">
                         <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${isActive ? 'text-white/60' : 'text-plainer'}`}>
                           {tier.subtitle}
                         </p>
                         <h3 className="text-4xl font-black tracking-tight mb-6">{tier.title}</h3>
                         <p className={`text-lg font-medium leading-snug ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                           {tier.description}
                         </p>
                      </div>

                      <div className="space-y-4">
                        {tier.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-4">
                            <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full mt-0.5 ${isActive ? 'bg-white text-plainer' : 'bg-plainer text-white'}`}>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <span className="text-sm font-bold tracking-tight">{feature}</span>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div className="pt-8 border-t border-current opacity-10">
                      <p className="text-[10px] font-black uppercase tracking-widest">Protocollo Plainer Legal v5.0</p>
                   </div>
                 </div>
               );
             })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default LegalProtection;
