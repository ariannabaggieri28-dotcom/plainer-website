
import React from 'react';
import { UserRole } from '../types';

interface HowItWorksProps {
  role: UserRole;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ role }) => {
  const steps = role === UserRole.PRIVATI ? [
    { num: "01", title: "Crea il progetto", desc: "Definisci i tuoi obiettivi con pochi click." },
    { num: "02", title: "AI Guided Brief", desc: "L'AI ti aiuta a creare una documentazione tecnica precisa." },
    { num: "03", title: "Confronta preventivi", desc: "Ricevi offerte omogenee e facili da comparare." },
    { num: "04", title: "Gestisci tutto", desc: "Pagamenti, varianti e documenti in un unico posto sicuro." }
  ] : [
    { num: "01", title: "Progetti qualificati", desc: "Accedi a richieste complete di brief e budget verificato." },
    { num: "02", title: "Brief strutturati", desc: "Basta sopralluoghi a vuoto. Ricevi dati tecnici chiari subito." },
    { num: "03", title: "Comunicazione tracciata", desc: "Gestisci ogni scambio di informazioni in modo professionale." },
    { num: "04", title: "Profilo e Portfolio", desc: "Costruisci la tua reputazione digitale basata sui fatti." }
  ];

  return (
    <section className="py-24 md:py-40 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-20">Il percorso Plainer</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-10 border border-black/5 hover:border-plainer transition-colors h-full flex flex-col justify-between">
              <div>
                <span className="text-5xl font-black text-black/5 block mb-8">{step.num}</span>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
