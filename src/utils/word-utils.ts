import wordBank from "../word-bank.json";

export function getTodaysWord() {
  const randomIndex = Math.floor(Math.random() * wordBank.valid.length);
  return wordBank.valid[randomIndex];
}

export const LETTER_LENGTH = 5;

export enum LetterState {
  Miss,
  Present,
  Match,
}

export function computeGuess(guess: string, answer: string): LetterState[] {
  const result: LetterState[] = [];

  if (answer.length !== guess.length) return result;

  const guessArray = guess.split("");
  const answerArray = answer.split("");

  const letterCountStorage: Record<string, number> = letterCounter(answer);

  guessArray.forEach((letter: string, index: number) => {

    if (letter === answerArray[index]) {

      if (letterCountStorage[letter] > 0) {
        result.push(LetterState.Match);
      } else {
        result.push(LetterState.Miss);
      }
      letterCountStorage[letter] -= 1;

    } else if (answerArray.includes(letter)) {

      if (letterCountStorage[letter] > 0) {
        result.push(LetterState.Present);
      } else {
        result.push(LetterState.Miss);
      }
      letterCountStorage[letter] -= 1;

    } else {
      result.push(LetterState.Miss);
    }
  })

  return result;
}

function letterCounter(word: string) {
  const letterCountStorage: Record<string, number> = {};
  word.split("").map((letter: string) => {
    if (letterCountStorage[letter]) {
      letterCountStorage[letter] += 1;
    } else {
      letterCountStorage[letter] = 1;
    }
  });

  return letterCountStorage;
}