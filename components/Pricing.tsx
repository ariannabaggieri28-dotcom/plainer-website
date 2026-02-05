
import React from 'react';
import { UserRole, PricingPlan } from '../types';

interface PricingProps {
  role: UserRole;
}

const Pricing: React.FC<PricingProps> = ({ role }) => {
  const isPro = role === UserRole.PROFESSIONISTI;
  const plans: PricingPlan[] = role === UserRole.PRIVATI ? [
    {
      name: "Free",
      price: "0",
      features: ["Creazione progetto", "AI basic assistant", "3 Preventivi", "App mobile"],
      cta: "Inizia gratis"
    },
    {
      name: "Plus",
      price: "19",
      features: ["Assistenza AI Premium", "Preventivi illimitati", "Verifica professionisti", "Supporto email"],
      cta: "Vai al Plus",
      highlighted: true
    },
    {
      name: "Premium",
      price: "49",
      features: ["Tutela legale inclusa", "Account manager", "Analisi fiscale avanzata", "Priorità assoluta"],
      cta: "Diventa Premium"
    }
  ] : [
    {
      name: "Starter",
      price: "29",
      features: ["Accesso ai lead basic", "Profilo verificato", "5 Risposte/mese", "Firma digitale"],
      cta: "Inizia ora"
    },
    {
      name: "Pro",
      price: "79",
      features: ["Accesso prioritario lead", "Suggerimenti AI Proposta", "Risposte illimitate", "Pagamenti tracciati"],
      cta: "Passa a Pro",
      highlighted: true
    },
    {
      name: "Studio",
      price: "199",
      features: ["Gestione team", "Analisi di mercato", "Automazione fatture", "Supporto dedicato 24/7"],
      cta: "Contattaci"
    }
  ];

  return (
    <section className={`py-24 md:py-40 px-6 transition-colors duration-500 ${isPro ? 'bg-[#0A0A0A] text-white border-t border-white/5' : 'bg-white text-black border-t border-black/5'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Piani semplici.</h2>
          <p className={`text-xl font-medium ${isPro ? 'text-gray-400' : 'text-gray-500'}`}>Scegli la trasparenza fin dal primo giorno.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`p-12 flex flex-col h-full border transition-all ${
                plan.highlighted 
                  ? 'border-plainer border-2 scale-105 z-10' 
                  : isPro ? 'border-white/10 bg-white/5' : 'border-black/5 bg-gray-50'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-black">€{plan.price}</span>
                <span className={`ml-2 font-bold ${isPro ? 'text-gray-500' : 'text-gray-400'}`}>/mese</span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 font-medium">
                    <div className="w-1.5 h-1.5 bg-plainer rotate-45"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 font-black transition-all ${
                plan.highlighted 
                ? 'bg-plainer text-white hover:opacity-90' 
                : isPro ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-black/90'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
