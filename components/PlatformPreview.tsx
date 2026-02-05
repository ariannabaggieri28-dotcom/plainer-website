
import React from 'react';
import { UserRole } from '../types';

interface PlatformPreviewProps {
  role: UserRole;
}

const PlatformPreview: React.FC<PlatformPreviewProps> = ({ role }) => {
  const isPro = role === UserRole.PROFESSIONISTI;

  return (
    <div className="relative w-full h-[450px] md:h-[600px] flex items-center justify-center pointer-events-none">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-plainer/5 rounded-full blur-[120px]"></div>

      {/* Card 1: Budget & Money (The "Safety" Card) */}
      <div className={`absolute top-0 left-4 md:-left-12 w-56 md:w-64 p-6 rounded-[2rem] border shadow-2xl animate-float transition-all duration-700 z-30 ${
        isPro ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-black/5 text-black'
      }`}>
        <div className="flex justify-between items-center mb-6">
           <div className="w-10 h-10 bg-plainer/10 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-plainer" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"></path></svg>
           </div>
           <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[8px] font-black uppercase tracking-widest rounded">Certificato</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Budget Allocato</p>
        <p className="text-3xl font-black tracking-tighter mb-4">€42.500</p>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
           <div className="h-full bg-plainer w-[65%]"></div>
        </div>
      </div>

      {/* Card 2: The Professional (The "Quality" Card) */}
      <div className={`absolute bottom-10 -right-4 md:-right-16 w-56 md:w-72 p-6 rounded-[2rem] border shadow-2xl animate-float-delayed transition-all duration-700 z-20 ${
        isPro ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-black/5 text-black'
      }`}>
        <div className="flex items-center gap-4 mb-6">
           <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-plainer to-blue-300"></div>
           </div>
           <div>
              <p className="text-sm font-black">Arch. Giulia Riva</p>
              <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest">Top Rated Pro</p>
           </div>
        </div>
        <div className="space-y-3">
           <div className="flex justify-between items-center text-[10px] font-bold">
              <span className="opacity-40">Rating</span>
              <span className="text-plainer">4.9/5.0</span>
           </div>
           <div className="flex justify-between items-center text-[10px] font-bold">
              <span className="opacity-40">Progetti</span>
              <span>24 Conclusi</span>
           </div>
        </div>
      </div>

      {/* Card 3: Milestone Update (The "Control" Card) */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-80 p-8 rounded-[2.5rem] border shadow-[0_50px_100px_rgba(0,0,0,0.1)] transition-all duration-700 z-10 ${
        isPro ? 'bg-zinc-800 border-white/10 text-white' : 'bg-white border-black/5 text-black'
      }`}>
        <div className="text-center">
           <div className="inline-block px-3 py-1 bg-plainer text-white text-[8px] font-black uppercase tracking-widest rounded-full mb-6">Live Update</div>
           <h4 className="text-xl font-black mb-2 tracking-tight">Fase 2: Impianti</h4>
           <p className="text-xs font-medium opacity-50 mb-8">Lavori in corso • 72% Completato</p>
           <div className="grid grid-cols-3 gap-2 h-12 mb-6">
              {[1, 1, 0].map((v, i) => (
                <div key={i} className={`rounded-lg ${v ? 'bg-plainer' : 'bg-gray-100'}`}></div>
              ))}
           </div>
           <p className="text-[10px] font-bold text-plainer uppercase tracking-widest">Sincronizzazione attiva</p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.02); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(20px) scale(0.98); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default PlatformPreview;
