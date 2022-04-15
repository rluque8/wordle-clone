import { LetterState, LETTER_LENGTH } from "./utils/word-utils";

interface WordRowProps {
  letters: string;
  result?: LetterState[];
  className?: string;
}

export default function WordRow({ letters: lettersProp = '', result = [], className = '' }: WordRowProps) {
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;

  // If we only have written 3 letteb rs, the remaining 2 will be filled with '' in the array
  const letters: string[] = lettersProp.split('').concat(Array(lettersRemaining)).fill('');
  
  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {letters.map((char: string, index: number) => (
        <CharacterBox key={index} value={char} state={result[index]} />
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
    <span className={`inline-block border-2 border-gray-500 p-4 uppercase
    before:inline-block before:content-['_']
    font-bold text-2xl text-center ${stateStyles}`}>
      {value}
    </span>
  );
}

const characterStateStyles = {
  [LetterState.Miss]: 'bg-[#787C7F] border-[#787C7F]',
  [LetterState.Present]: 'bg-[#C9B458] border-[#C9B458]',
  [LetterState.Match]: 'bg-[#6AAA64] border-[#6AAA64]',
}
