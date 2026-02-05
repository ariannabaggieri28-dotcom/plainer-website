
import React, { useState } from 'react';
import { UserRole } from '../types';

interface VerifiedProsProps {
  role: UserRole;
}

const VerifiedPros: React.FC<VerifiedProsProps> = ({ role }) => {
  const isPro = role === UserRole.PROFESSIONISTI;
  const [budget, setBudget] = useState(75000);

  // Dati per i privati (imprese)
  const companies = [
    {
      name: "Studio Architettura & Co",
      rating: "4.9",
      specialization: "Ristrutturazioni Luxury",
      match: 99,
      location: "Milano"
    },
    {
      name: "Edilnord Professionisti",
      rating: "4.8",
      specialization: "Efficienza Energetica",
      match: 94,
      location: "Monza"
    }
  ];

  // Dati per i professionisti (lead/richieste utenti)
  const leads = [
    {
      title: "Attico Vista Duomo",
      user: "Marco G.",
      budget: "€145.000",
      specs: "140mq • Ristrutturazione Totale",
      match: 98,
      status: "Budget Validato"
    },
    {
      title: "Loft Industriale Navigli",
      user: "Elena S.",
      budget: "€85.000",
      specs: "90mq • Interior Design + Impianti",
      match: 95,
      status: "Fondi in Escrow"
    },
    {
      title: "Villa Unifamiliare",
      user: "Davide R.",
      budget: "€210.000",
      specs: "220mq • Efficientamento + Finiture",
      match: 92,
      status: "Pratica CILA attiva"
    }
  ];

  return (
    <section className={`py-24 md:py-48 px-6 transition-colors duration-500 ${isPro ? 'bg-[#0A0A0A] text-white border-t border-white/5' : 'bg-white text-black border-t border-black/5'}`}>
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5 sticky top-32">
            <span className="text-[10px] font-black text-plainer uppercase tracking-[0.4em] mb-6 block">
              {isPro ? "Marketplace Opportunità" : "Verified Matching"}
            </span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-10">
              {isPro ? "Commesse reali. Fondi pronti." : "L'impresa ideale. Per il tuo budget."}
            </h2>
            <p className={`text-xl md:text-2xl font-medium mb-12 leading-relaxed ${isPro ? 'text-gray-400' : 'text-gray-500'}`}>
              {isPro 
                ? "Basta perdite di tempo con lead non qualificati. Plainer ti mostra solo progetti con budget già depositato e brief tecnici completi pronti per la quotazione."
                : "Selezioniamo solo il top 5% delle imprese locali. Il nostro algoritmo incrocia budget, tempi e qualità storica per garantirti il miglior risultato possibile."}
            </p>

            {!isPro && (
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                     <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Allocazione Investimento</label>
                     <span className="text-4xl font-black text-plainer tracking-tighter">€{budget.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="15000" 
                    max="300000" 
                    step="5000"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-plainer"
                  />
                </div>
                <button className="w-full py-6 bg-plainer text-white rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-black transition-all shadow-xl active:scale-95">
                  Trova imprese compatibili
                </button>
              </div>
            )}
          </div>

          {/* Grid of items (companies for users, leads for pros) */}
          <div className={`lg:col-span-7 grid grid-cols-1 ${isPro ? 'md:grid-cols-1 gap-6' : 'sm:grid-cols-2 gap-8'}`}>
            {isPro ? (
              // Modalità PROFESSIONISTI: 3 LEAD
              leads.map((lead, idx) => (
                <div key={idx} className="group p-8 md:p-12 bg-zinc-900 border border-white/10 rounded-[2.5rem] hover:border-plainer transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,68,241,0.1)]">
                   <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                      <div className="flex items-center gap-4">
                         <div className="w-14 h-14 bg-plainer/10 flex items-center justify-center rounded-2xl">
                            <span className="text-plainer font-black">{lead.user[0]}</span>
                         </div>
                         <div>
                            <h3 className="text-2xl font-black tracking-tight">{lead.title}</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">Richiesta di {lead.user}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-3xl font-black text-plainer tracking-tighter">{lead.match}%</div>
                         <div className="text-[9px] font-black uppercase tracking-widest opacity-30">Compatibilità AI</div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                         <p className="text-[9px] font-black text-plainer uppercase mb-2 tracking-widest">Budget Certificato</p>
                         <p className="text-3xl font-black tracking-tighter">{lead.budget}</p>
                      </div>
                      <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                         <p className="text-[9px] font-black text-plainer uppercase mb-2 tracking-widest">Dettagli Tecnici</p>
                         <p className="text-sm font-bold opacity-80 leading-tight">{lead.specs}</p>
                      </div>
                   </div>

                   <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-green-500">{lead.status}</span>
                      </div>
                      <button className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-plainer hover:text-white transition-all active:scale-95">
                         Visualizza Brief Completo
                      </button>
                   </div>
                </div>
              ))
            ) : (
              // Modalità PRIVATI: 2 IMPRESE
              companies.map((co, idx) => (
                <div key={idx} className="p-10 md:p-12 border rounded-[2.5rem] bg-gray-50 border-black/5 shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className="flex justify-between items-start mb-16">
                     <div className="w-12 h-12 bg-plainer/10 flex items-center justify-center rounded-2xl">
                        <div className="w-3 h-3 bg-plainer"></div>
                     </div>
                     <div className="text-right">
                        <div className="text-3xl font-black text-plainer tracking-tighter">{co.match}%</div>
                        <div className="text-[9px] font-black uppercase tracking-widest opacity-40">AI Match Score</div>
                     </div>
                  </div>
                  <h3 className="text-2xl font-black mb-2 tracking-tight">{co.name}</h3>
                  <div className="flex items-center gap-4 text-[10px] font-black opacity-50 mb-10 uppercase tracking-widest">
                     <span>{co.location}</span>
                     <span>•</span>
                     <span>{co.rating} Rating</span>
                  </div>
                  <div className="p-6 rounded-2xl border bg-white border-black/5">
                     <p className="text-[9px] font-black text-plainer uppercase mb-2 tracking-widest">Focus Tecnico</p>
                     <p className="text-sm font-bold leading-tight">{co.specialization}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifiedPros;
