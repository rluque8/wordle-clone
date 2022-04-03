import { describe, expect, it } from 'vitest'
import { getTodaysWord } from './word-utils'

describe('Word-utils', () => {
  it('get random word', () => {
    const wordSelected = getTodaysWord();
    expect(wordSelected.length).toEqual(5);
  })
})