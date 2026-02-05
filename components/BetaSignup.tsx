
import React, { useState } from 'react';
import { UserRole } from '../types';
import { registerBetaSignup } from '../firebase';

interface BetaSignupProps {
  role: UserRole;
  inline?: boolean;
}

const BetaSignup: React.FC<BetaSignupProps> = ({ role, inline = false }) => {
  const [email, setEmail] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const isPro = role === UserRole.PROFESSIONISTI;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) return;
    
    setStatus('loading');
    const result = await registerBetaSignup(email, role);
    
    if (result.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
      setErrorMessage(result.error || "Riprova tra poco.");
    }
  };

  if (status === 'success') {
    return (
      <div className={`p-8 border-2 border-plainer animate-in zoom-in-95 duration-500 ${isPro ? 'bg-white/5' : 'bg-plainer/5'}`}>
        <h3 className="text-xl font-bold mb-2">Sei in lista!</h3>
        <p className={isPro ? 'text-gray-400' : 'text-gray-600'}>Ti scriveremo appena apriremo gli accessi.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="La tua email"
            className={`flex-grow px-6 py-4 outline-none font-medium text-lg border-2 transition-all ${
              isPro 
                ? 'bg-white/10 border-transparent text-white focus:border-plainer' 
                : 'bg-gray-100 border-transparent text-black focus:border-plainer'
            }`}
          />
          <button
            type="submit"
            disabled={status === 'loading' || !privacyAccepted}
            className="bg-plainer text-white px-8 py-4 font-black text-lg hover:opacity-90 transition-opacity disabled:opacity-30 whitespace-nowrap"
          >
            {status === 'loading' ? '...' : isPro ? 'Entra' : 'Iscriviti'}
          </button>
        </div>
        
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id={`privacy-${role}`}
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 accent-plainer cursor-pointer"
          />
          <label htmlFor={`privacy-${role}`} className={`text-xs leading-snug cursor-pointer font-medium ${isPro ? 'text-gray-500' : 'text-gray-400'}`}>
            Accetto la <a href="#/privacy" className="underline hover:text-plainer">Privacy Policy</a>
          </label>
        </div>

        {status === 'error' && (
          <p className="text-red-500 font-bold text-xs">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default BetaSignup;
