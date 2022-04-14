import create from "zustand";
import { persist } from "zustand/middleware";
import { getTodaysWord } from "./utils/word-utils";

interface StoreState {
  answer: string;
  guesses: string[];
  addGuess: (guess: string) => void;
  newGame: () => void;
}

export const useStore = create<StoreState>(persist(
  (set, get) => ({
    answer: getTodaysWord(),
    guesses: ['hello', 'solar', 'penny'],
    addGuess: (guess: string) => {
      set(state => ({
        guesses: [...state.guesses, guess],
      }))
    },
    newGame: () => {
      set({
        answer: getTodaysWord(),
        guesses: [],
      })
    }
  }),
  {
    name: "cifras-wordle",
  }
));

// useStore.persist.clearStorage();