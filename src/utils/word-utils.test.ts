import { describe, expect, it } from 'vitest'
import { computeGuess, getTodaysWord, LetterState } from './word-utils'

describe('Word-utils', () => {
  it('get random word', () => {
    const wordSelected = getTodaysWord();
    expect(wordSelected.length).toEqual(5);
  });
})

describe('computeGuess', () => {
  it('works with match and present', () => {
    expect(computeGuess('boost','basic')).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
    ]);
  });
  
  it('works with full matches', () => {
    expect(computeGuess('boost','boost')).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ]);
  });
  
  it('works with full miss', () => {
    expect(computeGuess('guard','boost')).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });
  
  it('only does one match when two letters are present', () => {
    expect(computeGuess('solid','boost')).toEqual([
      LetterState.Present,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });
})