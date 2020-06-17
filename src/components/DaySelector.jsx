import React, { memo } from 'react';
import styled from 'styled-components';
import Day from './Day';
import { getWeek } from '../utils/date';

const week = getWeek();

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

function DaySelector({ value: selected, onChange }) {
  return (
    <Container onClick={onChange}>
      {week.map((day) => (
        <Day key={day.date} date={day} active={selected === day.date} />
      ))}
    </Container>
  );
}

export default memo(DaySelector);
