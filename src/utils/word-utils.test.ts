import { describe, expect, it } from 'vitest'
import { computeGuess, getTodaysWord, LetterState } from './word-utils'

describe('Word-utils', () => {
  it('get random word', () => {
    const wordSelected = getTodaysWord();
    expect(wordSelected.length).toEqual(5);
  });
})

describe('computeGuess', () => {
  it('works with match and  present', () => {
    expect(computeGuess('boost','basic')).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
    ]);
  });
})