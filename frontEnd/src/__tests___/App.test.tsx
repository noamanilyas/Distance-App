import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { cleanup, render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import App from '../App';

jest.mock('axios');

afterEach(cleanup);

beforeEach(() => {
  jest.clearAllMocks();
});

test('type text into input, and  display search results', async () => {
  render(<App />);

  const input = screen.getByLabelText('distanceInput') as HTMLInputElement;
  const button = screen.getByLabelText('distanceInputBtn') as HTMLInputElement;

  fireEvent.change(input, { target: { value: 500 } });
  fireEvent.click(button);

  expect(axios.get).toHaveBeenCalled();
});

test('Error: should throw api error', async () => {
  render(<App />);

  const input = screen.getByLabelText('distanceInput') as HTMLInputElement;
  const button = screen.getByLabelText('distanceInputBtn') as HTMLInputElement;

  fireEvent.change(input, { target: { value: undefined } });
  fireEvent.click(button);

  expect(axios.get).toHaveBeenCalled();
});
