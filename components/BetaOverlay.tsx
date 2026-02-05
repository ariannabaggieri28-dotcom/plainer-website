
import React, { useState } from 'react';
import { UserRole } from '../types';
import { registerBetaSignup } from '../firebase';

interface BetaOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
}

const BetaOverlay: React.FC<BetaOverlayProps> = ({ isOpen, onClose, role }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const isPro = role === UserRole.PROFESSIONISTI;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) return;
    
    setStatus('loading');
    const result = await registerBetaSignup(email, role);
    
    if (result.success) {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setEmail('');
      }, 3000);
    } else {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      ></div>
      
      {/* Content Card */}
      <div className={`relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] md:rounded-[4rem] transition-all duration-700 transform scale-100 shadow-2xl ${
        isPro ? 'bg-zinc-900 text-white' : 'bg-white text-black'
      }`}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full border border-current opacity-20 hover:opacity-100 transition-opacity"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Visual Side */}
          <div className="hidden lg:flex flex-col justify-between p-16 bg-plainer text-white relative">
             <div className="text-2xl font-bold tracking-tighter" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>PLAINER</div>
             <div>
                <div className="text-8xl font-black tracking-tighter mb-4">2500+</div>
                <p className="text-xl font-bold opacity-80 uppercase tracking-widest leading-tight">Plainers già a bordo</p>
             </div>
             <div className="h-1 bg-white/20 w-full rounded-full">
                <div className="h-full bg-white w-3/4 animate-pulse"></div>
             </div>
          </div>

          {/* Form Side */}
          <div className="p-8 md:p-16 flex flex-col justify-center">
            {status === 'success' ? (
              <div className="text-center py-20 animate-in zoom-in-95">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white shadow-2xl">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-4xl font-black tracking-tighter mb-4">Sei dentro.</h2>
                <p className="text-xl font-medium opacity-60">Riceverai un invito personale a breve.</p>
              </div>
            ) : (
              <>
                <div className="mb-12">
                   <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-6">
                      Unisciti ad altri <span className="text-plainer">2500+ plainers</span>
                   </h2>
                   <p className="text-xl md:text-2xl font-medium opacity-50 leading-tight">
                      Cambia il mondo delle ristrutturazioni con noi. Diventa un pioniere.
                   </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="La tua migliore email"
                      className={`w-full px-0 py-6 text-2xl md:text-3xl font-black bg-transparent border-b-2 outline-none transition-all placeholder:opacity-20 ${
                        isPro ? 'border-white/10 focus:border-plainer' : 'border-black/10 focus:border-plainer'
                      }`}
                    />
                  </div>

                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      id="privacy-overlay"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-1 w-5 h-5 accent-plainer cursor-pointer"
                    />
                    <label htmlFor="privacy-overlay" className="text-sm font-medium opacity-40 cursor-pointer">
                      Accetto la Privacy Policy e il trattamento dei dati per la lista d'attesa.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading' || !privacyAccepted}
                    className="w-full py-6 bg-plainer text-white rounded-full font-black text-xs uppercase tracking-[0.25em] hover:bg-black transition-all active:scale-95 disabled:opacity-30 shadow-2xl shadow-plainer/30"
                  >
                    {status === 'loading' ? 'Registrazione in corso...' : 'Voglio unirmi alla beta'}
                  </button>
                  
                  {status === 'error' && (
                    <p className="text-red-500 font-bold text-center text-sm">Qualcosa è andato storto. Riprova tra poco.</p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetaOverlay;
