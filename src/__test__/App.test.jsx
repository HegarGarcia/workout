import React from 'react';
import { render, act } from '@testing-library/react';
import App from '../App';

describe('<App /> spec', () => {
  it('Should not regress', async () => {
    let container;

    await act(async () => {
      container = await render(<App />);
    });

    expect(container.container).toMatchSnapshot();
  });
});
