import { describe, expect, it } from 'vitest'
import App from './App'
import { useStore } from './store';
import { render, screen, userEvent } from './test/test-utils'

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />)
    expect(screen.getByText(/Cifras/i)).toBeInTheDocument()
  });

  it('shows empty state', () => {
    useStore.setState({ guesses: [] });
    render(<App />)
    expect(screen.queryByText('Game Over')).toBeNull();
    expect(document.querySelectorAll('main div')).toHaveLength(6);
    expect(document.querySelector('main')?.textContent).toEqual('');
  });

  it('shows one row of guesses', () => {
    useStore.setState({ guesses: ["hello"] });
    render(<App />)

    expect(document.querySelector('main')?.textContent).toEqual('hello');
  });

  it('shows game over state', () => {
    useStore.setState({ guesses: Array(6).fill("hello") });
    render(<App />)

    expect(screen.getByText('Game Over!')).toBeInTheDocument();

  });

  it('can start a new game', () => {
    useStore.setState({ guesses: Array(6).fill("hello") });
    render(<App />)

    userEvent.click(
      screen.getByText("New Game")
    );
    expect(document.querySelector('main')?.textContent).toEqual('');


  });
})