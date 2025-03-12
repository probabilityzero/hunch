import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import Fuse from 'fuse.js';
import { Volume2, Clock, RefreshCcw, Lightbulb } from 'lucide-react';
import Cookies from 'js-cookie';
import { animals } from './data/animals';
import { HomeScreen } from './components/HomeScreen';
import { GuessRow } from './components/GuessRow';
import { GameHeader } from './components/GameHeader';
import { Congratulations } from './components/Congratulations.tsx';
import { AnimatedHint } from './components/AnimatedHint';
import type { GameState, Animal, GuessResult } from './types/game';

const INITIAL_STATE: GameState = {
  searchTerm: '',
  guessHistory: [],
  targetAnimal: null,
  suggestions: [],
  gameMode: 'mammals',
  screen: 'home',
  timeElapsed: 0,
  isCorrect: false
};

const fuse = new Fuse(animals, {
  keys: ['name'],
  threshold: 0.4
});

function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [correctGuesses, setCorrectGuesses] = useState(Number(Cookies.get('correctGuesses') || 0));
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!gameState.targetAnimal) {
      const randomAnimal = animals.find(a => a.category === gameState.gameMode) || animals[0];
      setGameState(prev => ({ ...prev, targetAnimal: randomAnimal }));
    }
  }, [gameState.gameMode]);

  useEffect(() => {
    let timer: number;
    if (gameState.screen === 'game' && !gameState.isCorrect) {
      timer = window.setInterval(() => {
        setGameState(prev => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState.screen, gameState.isCorrect]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [gameState.suggestions]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!gameState.suggestions.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < gameState.suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : gameState.suggestions.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      handleSelectAnimal(gameState.suggestions[selectedIndex]);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    const results = fuse.search(searchTerm);
    setGameState(prev => ({ ...prev, searchTerm, suggestions: results.map(result => result.item) }));
    setShowHint(false);
    setCurrentHint('');
  };

  const handleSelectAnimal = (animal: Animal) => {
    if (!gameState.targetAnimal) return;

    const matchingTraits = new Set(animal.traits.filter(trait => gameState.targetAnimal!.traits.includes(trait)));
    const isCorrect = animal.name === gameState.targetAnimal.name;
    const newGuess: GuessResult = { animal, matchingTraits };

    setGameState(prev => ({
      ...prev,
      searchTerm: '',
      suggestions: [],
      guessHistory: [newGuess, ...prev.guessHistory],
      isCorrect
    }));

    if (isCorrect) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setCorrectGuesses(prev => prev + 1);
      Cookies.set('correctGuesses', (correctGuesses + 1).toString());
      setShowModal(true);
    }

    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSelectMode = (mode: string) => {
    const randomAnimal = animals.find(a => a.category === mode) || animals[0];
    setGameState({ ...INITIAL_STATE, gameMode: mode, screen: 'game', targetAnimal: randomAnimal });
  };

  const playRandomSound = () => {
    if (!gameState.targetAnimal) return;
    new Audio(gameState.targetAnimal.soundUrl).play();
  };

  const resetGame = () => {
    const randomAnimal = animals.find(a => a.category === gameState.gameMode) || animals[0];
    setGameState({ ...INITIAL_STATE, screen: 'game', gameMode: gameState.gameMode, targetAnimal: randomAnimal });
    setShowHint(false);
    setCurrentHint('');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleShowHint = () => {
    if (!gameState.targetAnimal) return;
    const availableHints = gameState.targetAnimal.traits.filter(
      trait => !gameState.guessHistory.some(guess => guess.animal.traits.includes(trait))
    ).slice(0, 5);

    if (availableHints.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableHints.length);
      setCurrentHint(availableHints[randomIndex]);
      setShowHint(true);
      setTimeout(() => {
        setShowHint(false);
        setCurrentHint('');
      }, 2000);
    }
  };

  if (gameState.screen === 'home') {
    return (
      <div className="min-h-screen bg-gray-50">
        <GameHeader gameMode={gameState.gameMode} guessCount={gameState.guessHistory.length} />
        <HomeScreen onSelectMode={handleSelectMode} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <GameHeader gameMode={gameState.gameMode} guessCount={gameState.guessHistory.length} />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <div className="flex gap-4 justify-between items-center">
          <button onClick={() => setGameState(INITIAL_STATE)} className="text-xs text-gray-600 hover:text-blue-600">Home</button>
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="w-6 h-6" />
            <span className="text-lg font-bold rounded-full px-3 py-1 bg-gray-100">{formatTime(gameState.timeElapsed)}</span>
          </div>
          <button onClick={resetGame} className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-1">
            <RefreshCcw className="w-3 h-3" />
            Restart
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {gameState.guessHistory.map((guess, index) => (
            <GuessRow key={index} animal={guess.animal} matchingTraits={guess.matchingTraits} targetTraits={gameState.targetAnimal?.traits || []} />
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">

              {/* Suggestions Dropdown */}
              {gameState.suggestions.length > 0 && (
                <div className="absolute z-10 left-0 right-0  bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
                style={{ bottom: '100%'}}
                >
                  {gameState.suggestions.map((animal, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectAnimal(animal)}
                      className={`w-full px-4 py-2 text-left transition-colors ${index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                    >
                      {animal.name}
                    </button>
                  ))}
                </div>
              )}
              {/* Input Field */}
              <input
                ref={searchInputRef}
                type="text"
                value={gameState.searchTerm}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                placeholder="Choose an animal..."
                className="w-full px-4 py-2 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={gameState.isCorrect}
              />

              {/* Animated Hint */}
              {showHint && currentHint && <AnimatedHint hint={currentHint} />}
            </div>

            {/* Hint and Sound Buttons */}
            <div className="mt-2 flex gap-2">
              <button
                onClick={handleShowHint}
                className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                title="Show Hint"
              >
                Hint
              </button>
              <button
                onClick={playRandomSound}
                className="p-2 text-gray-600 hover:text-gray-800 rounded-full transition-colors"
                title="Play Sound Hint"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animal Modal */}
      {showModal && gameState.targetAnimal && (
        <Congratulations
          animal={gameState.targetAnimal}
          timeElapsed={gameState.timeElapsed}
          onNewGuess={resetGame}
          onGoHome={() => setGameState(INITIAL_STATE)}
        />
      )}
    </div>
  );
}

export default App;
