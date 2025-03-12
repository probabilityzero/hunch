export type GameMode = 'mammals' | 'birds' | 'reptiles' | 'countries';

export interface Animal {
  name: string;
  category: GameMode;
  imageUrl: string;
  soundUrl: string;
  traits: string[];
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
  gameMode: GameMode;
  screen: 'home' | 'game';
  timeElapsed: number;
  isCorrect: boolean;
}
