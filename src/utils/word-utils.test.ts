import { describe, expect, it } from 'vitest'
import { computeGuess, getTodaysWord, LetterState } from './word-utils'

describe('Word-utils', () => {
  it('get random word', () => {
    const wordSelected = getTodaysWord();
    expect(wordSelected.length).toEqual(5);
  });
})

describe('computeGuess', () => {
  it('returns empty when length mismatch', () => {
    expect(computeGuess('abc', 'basic')).toEqual([]);
  });

  it('works with match and present', () => {
    expect(computeGuess('boost', 'basic')).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
    ]);
  });

  it('works with full matches', () => {
    expect(computeGuess('boost', 'boost')).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ]);
  });

  it('works with full miss', () => {
    expect(computeGuess('guard', 'boost')).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  it('only does one match when two letters are present', () => {
    expect(computeGuess('solid', 'boost')).toEqual([
      LetterState.Present,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  it('only does one match when 2 letters are present', () => {
    expect(computeGuess('allol','smelt')).toEqual([
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  it('does match when more than 2 letters are present', () => {
    expect(computeGuess('aaaaa','abcde')).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  it('does match when 2 letters are present in both words', () => {
    expect(computeGuess('aaaaa','aacde')).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });

  it('does full match when same letter is present more than 2 times in both words', () => {
    expect(computeGuess('ppppp','ppppp')).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ]);
  });
});
