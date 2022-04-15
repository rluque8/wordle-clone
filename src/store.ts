import create from "zustand";
import { persist } from "zustand/middleware";
import { computeGuess, getTodaysWord, LetterState } from "./utils/word-utils";

export const GUESS_LENGTH = 6;

interface GuessRow {
  guess: string;
  result?: LetterState[];
}

interface StoreState {
  answer: string;
  rows: GuessRow[];
  gameState: 'playing' | 'won' | 'lost';
  addGuess: (guess: string) => void;
  newGame: (initialGuess?: string[]) => void;
}

export const useStore = create<StoreState>(persist(
  (set, get) => {

    function addGuess(guess: string) {
      const result = computeGuess(guess, get().answer);
      const didWin = result.every(i => i === LetterState.Match);
      const rows = [...get().rows, { guess, result }];

      set(state => ({
        rows: [
          ...state.rows,
          {
            guess,
            result,
          }
        ],
        gameState: didWin ? 'won' : (rows.length === GUESS_LENGTH) ? 'lost' : 'playing',
      }))
    }

    return {
      answer: getTodaysWord(),
      rows: [],
      gameState: 'playing',
      addGuess,
      newGame: (initialRows = []) => {
        set({
          answer: getTodaysWord(),
          rows: [],
          gameState: 'playing',
        });
        initialRows.forEach(addGuess)
      }
    }
  },
  {
    name: "cifras-wordle",
  }
));

// useStore.persist.clearStorage();