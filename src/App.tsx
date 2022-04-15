import React, { useEffect, useRef, useState } from 'react';
import { GUESS_LENGTH, useStore } from './store';
import { isValidWord, LETTER_LENGTH } from './utils/word-utils';
import WordRow from './WordRow';

export default function App() {
  const state = useStore();
  const [guess, setGuess] = useGuess();
  const [showInvalidGuess, setInvalidGuess]  = useState(false);
  const addGuess =  useStore(s => s.addGuess);
  const previousGuess = usePrevious(guess);

  useEffect(() => {
    let id: any;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 1600);
    }

    return () => clearTimeout(id);
  }, [guess]);
  
  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
      if (isValidWord(previousGuess)) {
        addGuess(previousGuess);
        setInvalidGuess(false);
      } else {
        setInvalidGuess(true);
        setGuess(previousGuess);
      }
    }
  }, [guess]);

  let rows = [...state.rows];

  let currentRow = 0;
  if (rows.length < GUESS_LENGTH) {
    currentRow = rows.push({ guess }) - 1;
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length;

  const isGameOver = state.gameState !== 'playing';

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(''));


  return (
    <div className='mx-auto w-96 relative'>
      <header className='border-b border-gray-500 pb-2 my-2'>
        <h1 className="text-4xl text-center">Cifras</h1>
      </header>

      <main className='grid grid-rows-6 gap-4'>
        {rows.map(({ guess, result }, index) => {
          <WordRow key={index} letters={guess} result={result}
            className ={showInvalidGuess && currentRow === index ? 'animate-bounce' : ''}
          />
        })}
      </main>

      {isGameOver && (
        <div role="modal" className='absolute bg-white left-0 right-0 top-1/4 p-6
          w-3/4 mx-auto rounded border border-gray-500  text-center'>
          Game Over!

          <button className="block border rounded border-green-500 bg-green-500 p-2 mt-4 mx-auto shadow"
            onClick={() => {
              state.newGame();
              setGuess('');
            }}>
            New Game
          </button>
        </div>
      )}
    </div>
  )
}

function useGuess(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [guess, setGuess] = useState('');

  const onKeyDown = (event: KeyboardEvent) => {
    let letter = event.key;
    setGuess((currentGuess) => {
      const newGuess = letter.length === 1 ? currentGuess + letter : currentGuess;

      switch (letter) {
        case 'Backspace': {
          return newGuess.slice(0, -1);
        }
        case 'Enter': {
          if (newGuess.length === LETTER_LENGTH) {
            addGuess(newGuess);
            return '';
          }
          return newGuess.slice(0, -1);
        }
      }

      if (currentGuess.length === LETTER_LENGTH) {
        return currentGuess;
      }

      return newGuess;
    });
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  },[]);

  return [guess, setGuess];
}

function usePrevious<T>(value: T): T {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref: any = useRef<T>();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
