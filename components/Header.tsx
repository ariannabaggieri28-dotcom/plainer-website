
import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  onJoinBeta: () => void;
}

const Header: React.FC<HeaderProps> = ({ role, setRole, onJoinBeta }) => {
  const isPro = role === UserRole.PROFESSIONISTI;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 ${
      isPro 
        ? 'bg-black/80 border-b border-white/10 text-white' 
        : 'bg-white/80 border-b border-black/5 text-black'
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo - Helvetica, No Logotipo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl tracking-tighter flex items-center font-bold" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
            PLAINER
          </a>
        </div>

        {/* Role Switcher */}
        <div className={`hidden md:flex p-1 rounded-full ${isPro ? 'bg-white/5' : 'bg-gray-100'}`}>
          <button
            onClick={() => setRole(UserRole.PRIVATI)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              !isPro ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-white'
            }`}
          >
            Privati
          </button>
          <button
            onClick={() => setRole(UserRole.PROFESSIONISTI)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              isPro ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-black'
            }`}
          >
            Professionisti
          </button>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={onJoinBeta}
            className="inline-flex bg-plainer text-white px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-plainer/20"
          >
            Join Beta
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
