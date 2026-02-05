
import React from 'react';
import { UserRole } from '../types';

interface ReviewsProps {
  role: UserRole;
}

const Reviews: React.FC<ReviewsProps> = ({ role }) => {
  const isPro = role === UserRole.PROFESSIONISTI;

  const testimonials = isPro ? [
    { name: "Arch. Fabio M.", role: "Studio M-Design", text: "La pre-qualifica dei lead è un game changer. Ricevo solo brief completi, pronti per la firma." },
    { name: "Ing. Sara L.", role: "Ristruttura Srl", text: "I pagamenti escrow eliminano ogni attrito finanziario. Plainer è lo standard per i professionisti seri." }
  ] : [
    { name: "Elena K.", role: "Proprietaria", text: "Per la prima volta non ho avuto paura di sforare il budget. L'AI ha monitorato ogni centesimo." },
    { name: "Marco T.", role: "Proprietario", text: "Vedere l'avanzamento lavori in tempo reale con le foto dell'impresa mi ha tolto un peso enorme." }
  ];

  return (
    <section className={`py-24 md:py-48 px-6 transition-colors duration-500 border-t ${isPro ? 'bg-black border-white/5 text-white' : 'bg-gray-100 border-black/5 text-black'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-32 gap-12">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black text-plainer uppercase tracking-[0.4em] mb-6 block">Real Experiences</span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9]">Cosa dicono di noi.</h2>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-4 mb-2">
               <span className="text-7xl md:text-9xl font-black tracking-tighter text-plainer leading-none">4.9</span>
               <div className="flex flex-col">
                  <span className="text-2xl text-plainer">★★★★★</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Media Rating</span>
               </div>
            </div>
            <p className="text-xs font-bold opacity-30 uppercase tracking-widest mt-4">Analisi basata su oltre 1.200 progetti conclusi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className={`p-16 md:p-24 transition-all duration-500 border relative overflow-hidden group ${
              isPro ? 'bg-zinc-900 border-white/5' : 'bg-white border-black/5 shadow-sm hover:shadow-2xl'
            }`}>
              {/* Quote Mark Decor */}
              <div className="absolute top-10 right-10 text-8xl font-black opacity-[0.03] select-none pointer-events-none group-hover:opacity-10 transition-opacity">“</div>
              
              <p className="text-2xl md:text-3xl font-medium leading-tight mb-16 relative z-10 italic">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-16 h-16 bg-plainer/10 flex items-center justify-center text-plainer font-black text-xl uppercase rounded-full">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-black text-lg tracking-tight">{t.name}</p>
                  <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
