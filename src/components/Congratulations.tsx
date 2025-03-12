import React from 'react';
import type { Animal } from '../types/game';

interface AnimalModalProps {
  animal: Animal;
  timeElapsed: number;
  onNewGuess: () => void;
  onGoHome: () => void;
}

export const Congratulations: React.FC<AnimalModalProps> = ({ animal, timeElapsed, onNewGuess, onGoHome }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{animal.name}</h2>
        <img src={animal.imageUrl} alt={animal.name} className="w-full h-48 object-cover rounded-md mb-4" />
        <p className="text-gray-600 mb-2">Time to Guess: {formatTime(timeElapsed)}</p>
        <h3 className="text-lg font-semibold mb-2">Traits:</h3>
        <ul className="list-disc list-inside text-gray-600">
          {animal.traits.map((trait, index) => (
            <li key={index}>{trait}</li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onGoHome}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Home
          </button>
          <button
            onClick={onNewGuess}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            New Guess
          </button>
        </div>
      </div>
    </div>
  );
};
