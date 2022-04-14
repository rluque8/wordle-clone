import create from "zustand";
import { persist } from "zustand/middleware";
import { getTodaysWord } from "./utils/word-utils";

interface StoreState {
  answer: string;
  guesses: string[];
  addGuess: (guess: string) => void
}

export const useStore = create<StoreState>(persist(
  (set, get) => ({
    answer: getTodaysWord(),
    guesses: ['hello', 'solar', 'penny'],
    addGuess: (guess: string) => {
      set(state => ({
        guesses: [...state.guesses, guess],
      }))
    }
  }),
  {
    name: "cifras-wordle",
  }
));

// useStore.persist.clearStorage();