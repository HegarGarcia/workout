import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import DaySelector from '../DaySelector';
import { getWeek, getToday } from '../../utils/date';

describe('<DaySelector /> spec', () => {
  afterEach(cleanup);

  it('Should render all days of the week', () => {
    const week = getWeek().map((day) => day.number.toString());

    render(<DaySelector />);
    expect(screen.getAllByTestId('day-container').length).toBe(7);

    const dayElements = week.every((day) => screen.getByText(day));
    expect(dayElements).toBeTruthy();
  });

  it('Should change the active day on click', () => {
    let value = getToday();
    const onChange = jest.fn((event) => {
      value = event.target.closest('[data-date]').dataset.date;
    });

    render(<DaySelector value={value} onChange={onChange} />);

    const [firstDay] = screen.queryAllByTestId('day-container');

    fireEvent(firstDay, new MouseEvent('click', { bubbles: true }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(value).toBe(firstDay.closest('[data-date]').dataset.date);
  });
});
