import { render, screen } from '@testing-library/react';
import App from './App';

test('renders heartstrings control panel heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/heartstrings control panel/i);
  expect(headingElement).toBeInTheDocument();
});
