import React, {useState} from 'react';
import { ArrowLeft, Home, HelpCircle } from 'lucide-react';
import { Help } from './Help.tsx';

interface HeaderProps {
  gameMode: string;
  guessCount: number;
  onBackToHome?: () => void;
  showHelpModal: boolean;
  setShowHelpModal: (show: boolean) => void;
}

const getGameModeName = (mode: string): string => {
  const modeMap: Record<string, string> = {
    mammals: 'Animals',
    birds: 'Birds',
    fish: 'Fish',
    insects: 'Insects',
    plants: 'Plants',
    trees: 'Trees',
    countries: 'Countries',
    capitals: 'National Flags'
  };
  
  return modeMap[mode] || 'Hunch';
};

export const Header: React.FC<HeaderProps> = ({ 
  gameMode, 
  guessCount,
  onBackToHome,
  showHelpModal,
  setShowHelpModal
}) => {

  return (
    <>
    <header className="h-12 bg-gradient-to-r from-emerald-600 to-emerald-300 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-4xl mx-auto h-full flex items-center justify-between mx-4">
        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button 
              onClick={onBackToHome}
              className="p-2 rounded-full text-white hover:bg-emerald-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-xl font-bold text-white">Hunch</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {guessCount > 0 && (
            <div className="bg-white text-emerald-700 font-medium px-3 py-1 rounded-full shadow-sm">
              Score: {guessCount}
            </div>
          )}
          
          <button onClick={() => setShowHelpModal(true)} className="p-2 rounded-full text-white hover:bg-emerald-700 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          
          {/* <button className="p-2 rounded-full text-white hover:bg-emerald-700 transition-colors">
            <Home className="w-5 h-5" />
          </button> */}
        </div>
      </div>
    </header>
    <Help isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </>
  );
};

export default Header;
