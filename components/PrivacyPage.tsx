
import React from 'react';
import Header from './Header';
import { UserRole } from '../types';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
          <a href="/" className="text-2xl font-black tracking-tighter text-black flex items-center gap-2">
            <div className="w-8 h-8 bg-plainer rounded-none flex items-center justify-center">
              <div className="w-3 h-3 bg-white"></div>
            </div>
            PLAINER
          </a>
        </div>
      </header>

      <main className="pt-40 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-black mb-12 tracking-tight">Privacy Policy</h1>
          <div className="space-y-8 text-lg text-gray-600 leading-relaxed font-medium">
            <p>
              In Plainer, la tua privacy è fondamentale. Questa pagina spiega come raccogliamo e trattiamo i tuoi dati quando ti iscrivi alla nostra beta.
            </p>
            
            <h2 className="text-2xl font-bold text-black pt-4">1. Dati raccolti</h2>
            <p>
              Raccogliamo esclusivamente l'indirizzo email che ci fornisci e il ruolo selezionato (Privato o Professionista) per poterti inviare aggiornamenti mirati sulla disponibilità della nostra piattaforma.
            </p>

            <h2 className="text-2xl font-bold text-black pt-4">2. Finalità</h2>
            <p>
              I dati vengono utilizzati al solo scopo di gestire la lista d'attesa per la fase beta di Plainer. Non venderemo mai i tuoi dati a terze parti.
            </p>

            <h2 className="text-2xl font-bold text-black pt-4">3. Conservazione</h2>
            <p>
              I tuoi dati sono conservati su server sicuri gestiti tramite Google Firebase Cloud Firestore, con protocolli di sicurezza standard del settore.
            </p>

            <h2 className="text-2xl font-bold text-black pt-4">4. I tuoi diritti</h2>
            <p>
              In qualsiasi momento puoi richiedere la cancellazione dei tuoi dati dalla nostra lista scrivendo a privacy@plainer.io.
            </p>
          </div>
          
          <div className="mt-20">
            <a href="/" className="text-plainer font-bold text-lg flex items-center gap-2 hover:underline">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
               Torna alla Home
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;
