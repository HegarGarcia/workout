import React, { memo } from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  font-family: 'Fugaz One', cursive;
  font-size: ${({ size = 'normal' }) => {
    switch (size) {
      case 'normal':
        return '18px';
      case 'big':
        return '64px';
      default:
        return '18px';
    }
  }};
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
`;

const Logo = memo(({ size }) => <StyledSpan size={size}>WORKOUT</StyledSpan>);

export default Logo;
