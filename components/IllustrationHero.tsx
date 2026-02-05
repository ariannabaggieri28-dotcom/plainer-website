
import React from 'react';
import { UserRole } from '../types';

interface IllustrationHeroProps {
  role: UserRole;
}

const IllustrationHero: React.FC<IllustrationHeroProps> = ({ role }) => {
  // Lo stile ricalca l'immagine fornita: contorni neri, campiture blu #0044F1, stelle bianche.
  return (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[500px]">
      {/* Background Decor */}
      <circle cx="400" cy="100" r="40" fill="#0044F1" fillOpacity="0.1" />
      <rect x="50" y="350" width="80" height="80" stroke="#0044F1" strokeWidth="2" strokeDasharray="8 8" />

      {/* Main Character 1 - Holding the House (Safety/Guidance) */}
      <g className="animate-bounce-slow">
        {/* Character Body */}
        <path d="M150 450 L150 350 Q150 280 200 280 Q250 280 250 350 L250 450" fill="white" stroke="black" strokeWidth="6" />
        <path d="M170 450 L170 480 L130 480 L140 450" fill="black" />
        <path d="M230 450 L230 480 L270 480 L260 450" fill="black" />
        
        {/* Head */}
        <circle cx="200" cy="240" r="35" fill="white" stroke="black" strokeWidth="6" />
        <path d="M185 235 Q190 240 195 235" stroke="black" strokeWidth="3" fill="none" />
        <path d="M205 235 Q210 240 215 235" stroke="black" strokeWidth="3" fill="none" />
        <path d="M195 255 Q200 260 205 255" stroke="black" strokeWidth="3" fill="none" />
        
        {/* Hair (Graphic Style) */}
        <path d="M165 230 Q160 200 200 190 Q240 200 235 230" fill="black" />

        {/* The Blue House being held up */}
        <g transform="translate(140, 50)">
          <path d="M0 60 L60 0 L120 60 L120 140 L0 140 Z" fill="#0044F1" />
          {/* The White Star from the reference image */}
          <path d="M60 40 L65 65 L90 70 L65 75 L60 100 L55 75 L30 70 L55 65 Z" fill="white" />
        </g>
      </g>

      {/* Secondary Character - On the Laptop (Digital Platform) */}
      <g transform="translate(280, 220)">
        {/* Flower/Plant backdrop as in reference */}
        <path d="M40 0 C60 -40 100 -40 120 0 C140 40 100 80 60 80 C20 80 -20 40 0 0" fill="#0044F1" fillOpacity="0.2" />
        <circle cx="80" cy="20" r="15" fill="#0044F1" />
        <circle cx="120" cy="60" r="15" fill="#0044F1" />
        
        {/* Person Sitting */}
        <path d="M20 120 Q50 60 80 120" fill="white" stroke="black" strokeWidth="6" />
        <circle cx="50" cy="80" r="25" fill="white" stroke="black" strokeWidth="6" />
        <path d="M40 85 Q50 90 60 85" stroke="black" strokeWidth="2" fill="none" />
        
        {/* Laptop */}
        <path d="M60 110 L110 110 L120 140 L50 140 Z" fill="black" />
        
        {/* Lower House Icon */}
        <g transform="translate(40, 160) scale(0.6)">
           <path d="M0 60 L60 0 L120 60 L120 140 L0 140 Z" fill="#0044F1" />
           <path d="M60 40 L65 65 L90 70 L65 75 L60 100 L55 75 L30 70 L55 65 Z" fill="white" />
        </g>
      </g>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
};

export default IllustrationHero;
