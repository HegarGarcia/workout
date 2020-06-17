import Typography from '@material-ui/core/Typography';
import React, { memo } from 'react';
import styled, { css } from 'styled-components';

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

  ${({ active }) => {
    if (!active) {
      return css`
        background: transparent;
      `;
    }

    return css`
      background: #768fff;
    `;
  }}}
    
  span {
    font-size: 11px;
    font-weight: 500;
    margin-left: 1px;
  }
`;
function Day({ date, active }) {
  return (
    <DayContainer data-date={date.date}>
      <Typography variant="overline" component="p">
        {date.weekDay}
      </Typography>
      <StyledDay active={active}>
        <span>{date.number}</span>
      </StyledDay>
    </DayContainer>
  );
}

export default memo(Day);
