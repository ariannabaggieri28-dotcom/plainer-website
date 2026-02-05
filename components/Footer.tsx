
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
             <div className="text-3xl font-black tracking-tighter mb-8 flex items-center gap-2">
              <div className="w-10 h-10 bg-plainer rounded-none flex items-center justify-center">
                <div className="w-4 h-4 bg-white"></div>
              </div>
              PLAINER
            </div>
            <p className="text-gray-400 text-xl max-w-sm">
              La piattaforma definitiva per la ristrutturazione intelligente, sicura e guidata.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-6">Prodotto</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><a href="#" className="hover:text-white">Privati</a></li>
              <li><a href="#" className="hover:text-white">Professionisti</a></li>
              <li><a href="#" className="hover:text-white">AI Engine</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-6">Legale</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><a href="#/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white">Termini di Servizio</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-gray-500 text-sm font-medium">
          <p>© 2024 Plainer S.r.l. - Tutti i diritti riservati.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
