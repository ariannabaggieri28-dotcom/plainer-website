
import React from 'react';
import { UserRole } from '../types';

interface DashboardStripProps {
  role: UserRole;
}

const DashboardStrip: React.FC<DashboardStripProps> = ({ role }) => {
  const isPro = role === UserRole.PROFESSIONISTI;

  const reminders = isPro ? [
    { type: "PAGAMENTO", text: "Fattura n.42 pronta per il prelievo", value: "€4.200", urgent: true },
    { type: "TASK", text: "Invia foto fine demolizioni", value: "Entro oggi", urgent: false },
    { type: "SCADENZA", text: "Firma variante Bagno 1", value: "In attesa", urgent: true }
  ] : [
    { type: "SCADENZA", text: "Pagamento fornitura piastrelle", value: "12/05", urgent: true },
    { type: "PROSSIMO STEP", text: "Conferma scelta colori pareti", value: "Lunedì", urgent: false },
    { type: "DOCUMENTO", text: "Firma contratto idraulico", value: "Urgente", urgent: true }
  ];

  return (
    <section className={`py-24 px-6 transition-colors duration-500 border-t ${isPro ? 'bg-black border-white/5' : 'bg-gray-50 border-black/5'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
           <div className="w-1.5 h-1.5 bg-plainer rotate-45"></div>
           <h2 className="text-sm font-black uppercase tracking-[0.3em]">Centro Notifiche & Scadenze</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reminders.map((r, i) => (
            <div key={i} className={`p-10 border transition-all hover:translate-y-[-4px] ${
              r.urgent ? 'border-plainer bg-plainer/5' : isPro ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'
            }`}>
              <div className="flex justify-between items-start mb-6">
                <span className={`text-[10px] font-black uppercase tracking-widest ${r.urgent ? 'text-plainer' : 'opacity-40'}`}>
                  {r.type}
                </span>
                {r.urgent && <div className="w-2 h-2 rounded-full bg-plainer animate-pulse"></div>}
              </div>
              <h3 className={`text-xl font-black mb-8 leading-tight ${isPro ? 'text-white' : 'text-black'}`}>
                {r.text}
              </h3>
              <div className="flex justify-between items-center pt-6 border-t border-current opacity-20">
                <span className="text-[10px] font-black uppercase">Termine</span>
                <span className="text-sm font-black">{r.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardStrip;
