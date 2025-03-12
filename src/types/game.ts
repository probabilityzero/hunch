export interface Animal {
  name: string;
  traits: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  imageUrl: string;
  soundUrl: string;
}

export interface GuessResult {
  animal: Animal;
  matchingTraits: Set<string>;
}

export interface GameState {
  searchTerm: string;
  guessHistory: GuessResult[];
  targetAnimal: Animal | null;
  suggestions: Animal[];
  gameMode: 'animals' | 'plants' | 'countries';
  screen: 'home' | 'game';
  timeElapsed: number;
  isCorrect: boolean;
}
