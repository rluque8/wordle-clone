import wordBank from "../word-bank.json";

export const getTodaysWord = () => {
  const randomIndex = Math.floor(Math.random() * wordBank.valid.length);
  return wordBank.valid[randomIndex];
}

export enum LetterState {
  Miss,
  Present,
  Match,
}

export function computeGuess(guess: string, answer: string): LetterState[] {
  const result: LetterState[] = [];

  const guessArray = guess.split("");
  const answerArray = answer.split("");

  guessArray.forEach((letter: string, index: number) => {
    if (letter === answerArray[index]) {
      result.push(LetterState.Match);
    } else if (answerArray.includes(letter)) {
      result.push(LetterState.Present);
    } else {
      result.push(LetterState.Miss);
    }
  })

  return result;
}