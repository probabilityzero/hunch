import React from 'react';
import { X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-emerald-800">How to Play</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="space-y-6 text-gray-700">
          <section>
            <h3 className="text-xl font-semibold mb-3 text-emerald-700">Objective</h3>
            <p>
              Your goal is to guess the mystery card! It could be an animal, a country, or something else, depending on the game mode you choose.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-emerald-700">Gameplay</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Start typing the name of what you think the card is in the input box.</li>
              <li>As you type, suggestions will appear. You can click on a suggestion or use the arrow keys and Enter to select one.</li>
              <li>After each guess, you'll see how many characteristics your guess shares with the mystery card.</li>
              <li>Use the hints! Click the <span className="font-medium">Hint</span> button to reveal a characteristic of the mystery card.</li>
              <li>Listen to the sound! Click the <span className="font-medium">sound</span> icon to hear a sound related to the mystery card (if available).</li>
              <li>Keep guessing until you find the correct answer!</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-emerald-700">Game Modes</h3>
            <p>
              The game has different modes, each with its own set of cards. You can choose a mode from the home screen.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-emerald-700">Scoring</h3>
            <p>
              Your score is the number of guesses you've made. The lower the score, the better!
            </p>
          </section>
          <section>
            <h3 className="text-xl font-semibold mb-3 text-emerald-700">Restarting</h3>
            <p>
             You can restart anytime by clicking restart button.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
