
import React from 'react';
import { UserRole } from '../types';

interface TrustStripProps {
  role: UserRole;
}

const TrustStrip: React.FC<TrustStripProps> = ({ role }) => {
  const items = role === UserRole.PRIVATI ? [
    "Pagamenti controllati",
    "Nessun costo nascosto",
    "Contratti standard",
    "Tutela legale integrata",
    "Attività tracciate"
  ] : [
    "Pagamenti garantiti",
    "Lead pre-qualificati",
    "Contratti standard",
    "Tutela legale professionale",
    "Comunicazioni certificate"
  ];

  return (
    <div className="w-full bg-black py-8 overflow-hidden">
      <div className="flex whitespace-nowrap animate-infinite-scroll">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center mx-12">
             <div className="w-1.5 h-1.5 bg-plainer mr-4 rotate-45"></div>
             <span className="text-white text-sm font-black uppercase tracking-[0.2em]">{item}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TrustStrip;
