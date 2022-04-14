import { useStore } from "./store";
import { computeGuess, LetterState } from "./utils/word-utils";

export const LETTER_LENGTH = 5;

interface WordRowProps {
  letters: string;
}

export default function WordRow({ letters: lettersProp = '' }: WordRowProps) {
  const answer = useStore(state => state.answer);
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;

  // If we only have written 3 letters, the remaining 2 will be filled with '' in the array
  const letters: string[] = lettersProp.split('').concat(Array(lettersRemaining)).fill('');
  
  const guessStates = computeGuess(lettersProp, answer);

  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char: string, index: number) => (
        <CharacterBox key={index} value={char} state={guessStates[index]} />
      ))}
    </div>
  )
}

interface CharacterBoxProps {
  value: string;
  state?: LetterState;
}

function CharacterBox({ value, state }: CharacterBoxProps) {
  const stateStyles = state == null ? '' : characterStateStyles[state];

  return (
    <div className={`inline-block border-2 border-gray-500 p-4 uppercase
    font-bold text-2xl text-center ${stateStyles}`}>
      {value}
    </div>
  );
}

const characterStateStyles = {
  [LetterState.Miss]: 'bg-[#787C7F] border-[#787C7F]',
  [LetterState.Present]: 'bg-[#C9B458] border-[#C9B458]',
  [LetterState.Match]: 'bg-[#6AAA64] border-[#6AAA64]',
}
