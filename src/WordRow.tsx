import { LetterState, LETTER_LENGTH } from "./utils/word-utils";

interface WordRowProps {
  letters: string;
  result?: LetterState[];
  className?: string;
}

export default function WordRow({ letters = '', result = [], className = '' }: WordRowProps) {
  const lettersRemaining = LETTER_LENGTH - letters.length;

  // If we only have written 3 letters, the remaining 2 will be filled with '' in the array
  const word: string[] = letters.split('').concat(Array(lettersRemaining).fill(''));

  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {word.map((char, index) => (
        <CharacterBox key={index} value={char} state={result[index]} />
      ))}
    </div>
  );
}

interface CharacterBoxProps {
  value?: string;
  state?: LetterState;
}

function CharacterBox({ value, state }: CharacterBoxProps) {
  const stateStyles =
    state == null
      ? 'border-gray-500 text-black'
      : `${characterStateStyles[state]} text-white`;

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
