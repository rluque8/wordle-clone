const LETTER_LENGTH = 5;

interface WordRowProps {
  letters: string;
}

export default function WordRow({ letters: lettersProp = '' }: WordRowProps) {
  const lettersRemaining = LETTER_LENGTH - letters.length;
  // If we only have written 3 letters, the remaining 2 will be filled with '' in the array
  const letters = lettersProp.split('').concat(Array(lettersRemaining)).fill('');
  return (
    <div>{letters.map((char) => (
      <span key={char} className="inline-block mx-1">
        {char}
      </span>
    ))}</div>
  )
}
