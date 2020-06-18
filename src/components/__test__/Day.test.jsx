import React from 'react';

import { render, screen, cleanup } from '@testing-library/react';
import Day from '../Day';

describe('<Day /> spec', () => {
  const date = {
    date: '2020 06 17',
    weekDay: 'WED',
    number: 17
  };

  afterEach(cleanup);

  it('Should not regress', () => {
    const { container } = render(<Day date={date} />);
    expect(container).toMatchSnapshot();
  });

  it('Should show the day number', () => {
    render(<Day date={date} />);
    expect(screen.getByText(date.number.toString())).toBeTruthy();
  });

  it('Should show the week day nem', () => {
    render(<Day date={date} />);
    expect(screen.getByText(date.weekDay)).toBeTruthy();
  });

  it('Should save date in dataset', () => {
    render(<Day date={date} />);
    expect(screen.getByTestId('day-container').dataset.date).toBe(date.date);
  });
});
