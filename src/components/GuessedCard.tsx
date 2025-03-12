import React from 'react';
import type { Animal } from '../types/game';

interface GuessedCardProps {
  animal: Animal;
  matchingTraits: Set<string>;
  targetTraits: string[];
}

export const GuessedCard: React.FC<GuessedCardProps> = ({ animal, matchingTraits, targetTraits }) => {
  const displayedTraits = animal.traits.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={animal.imageUrl} alt={animal.name} className="w-16 h-16 object-cover rounded-full" />
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2">
            {displayedTraits.map((trait, index) => {
              const isMatch = matchingTraits.has(trait);
              const bgColorClass = isMatch ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
              return (
                <div key={index} className={`px-2 py-1 rounded ${bgColorClass} text-sm`}>
                  {trait}
                </div>
              );
            })}
          </div>
          <h2 className="text-lg font-semibold mt-2">{animal.name}</h2>
        </div>
      </div>
    </div>
  );
};
