
import React from 'react';
import { UserRole } from '../types';

interface PaymentProtocolProps {
  role: UserRole;
}

const PaymentProtocol: React.FC<PaymentProtocolProps> = ({ role }) => {
  const isPro = role === UserRole.PROFESSIONISTI;

  const steps = [
    {
      title: "Deposito",
      desc: isPro ? "I fondi del cliente vengono bloccati nel conto escrow." : "Versi i fondi della fase nel conto sicuro Plainer.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
      )
    },
    {
      title: "Milestone",
      desc: "L'impresa esegue i lavori e carica la documentazione tecnica.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      )
    },
    {
      title: "Rilascio",
      desc: isPro ? "Ricevi l'accredito immediato dopo l'approvazione digitale." : "Approvi lo stato lavori e sblocchi il pagamento con un tap.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      )
    }
  ];

  return (
    <section className={`py-24 md:py-48 px-6 transition-colors duration-500 ${isPro ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-[10px] font-black text-plainer uppercase tracking-[0.4em] mb-6 block">Financial Protocol</span>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-10 max-w-4xl mx-auto">
            Pagamenti certi. Per tutti.
          </h2>
          <p className={`text-xl md:text-2xl font-medium max-w-2xl mx-auto ${isPro ? 'text-gray-400' : 'text-gray-500'}`}>
            Abbiamo eliminato le discussioni sui soldi. Il nostro sistema di tutela escrow garantisce che i fondi siano sempre pronti e vengano rilasciati solo a lavoro certificato.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-current opacity-10 -translate-y-12"></div>
          
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center p-10 group">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 border-2 transition-all duration-500 ${
                isPro ? 'bg-zinc-900 border-white/10 group-hover:border-plainer' : 'bg-gray-50 border-black/5 group-hover:border-plainer'
              }`}>
                <div className="text-plainer">{step.icon}</div>
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{step.title}</h3>
              <p className={`text-sm font-medium leading-relaxed ${isPro ? 'text-gray-500' : 'text-gray-400'}`}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentProtocol;
