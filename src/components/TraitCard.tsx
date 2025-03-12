import React from 'react';
import { Check } from 'lucide-react';

interface TraitCardProps {
  trait: string;
  isMatching: boolean;
}

export const TraitCard: React.FC<TraitCardProps> = ({ trait, isMatching }) => {
  return (
    <div
      className={`
        relative p-4 rounded-lg shadow-md transition-all duration-300
        ${isMatching ? 'bg-green-100 border-green-500' : 'bg-white border-gray-200'}
        border-2
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium">{trait}</span>
        {isMatching && <Check className="w-6 h-6 text-green-500" />}
      </div>
    </div>
  );
};
