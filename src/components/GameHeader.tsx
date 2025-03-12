import React from 'react';

interface GameHeaderProps {
  gameMode: string;
  guessCount: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ gameMode, guessCount }) => {
  return (
    <header className="h-12 bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-4xl mx-auto h-full flex items-center justify-between px-4">
        <h1 className="text-xl font-semibold text-gray-800">Hunch</h1>
        <div className="flex items-center gap-6">
          {/* <div className="font-medium text-gray-600">Score: {guessCount}</div> */}
        </div>
      </div>
    </header>
  );
};
