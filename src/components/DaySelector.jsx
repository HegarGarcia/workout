/* eslint-disable implicit-arrow-linebreak */
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 56px;
  margin: 0.5rem 0;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(7, 1fr);
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
`;

const DayContainer = styled.button`
  display: flex;
  flex-direction: column;
  background: transparent;
  border: none;
  color: white;
  outline: none;
  text-transform: uppercase;
  text-align: center;
  align-items: center;

  p {
    color: rgba(255, 255, 255, 0.36);
  }
`;

const StyledDay = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease-in-out;

  ${({ active }) =>
    active &&
    css`
      background: #768fff;
    `}
  span {
    font-size: 11px;
    font-weight: 500;
    margin-left: 1px;
  }
`;

const getWeekEntries = () => {
  const week = moment();

  return Array.from({ length: 7 }, (_, i) => {
    const day = week.day(i);
    return [+day.format('D'), day.format('ddd')];
  });
};

const Day = ({ dayName, dayNumber, active }) => (
  <DayContainer data-day={dayNumber}>
    <Typography variant="overline" component="p">
      {dayName}
    </Typography>
    <StyledDay active={active}>
      <span>{dayNumber}</span>
    </StyledDay>
  </DayContainer>
);

const DaySelector = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const days = getWeekEntries();

  const handleClick = useCallback((event) => {
    const { day } = event.target.closest('button').dataset;
    setSelectedDay(+day);
  }, []);

  return (
    <Container onClick={handleClick}>
      {days.map(([dayNumber, dayName]) => (
        <Day
          key={dayName}
          dayName={dayName}
          dayNumber={dayNumber}
          active={selectedDay === dayNumber}
        />
      ))}
    </Container>
  );
};

export default DaySelector;
