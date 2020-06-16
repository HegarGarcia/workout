import styled, { css } from 'styled-components';

const DynamicBackground = styled.div`
  width: 100%;
  height: 100%;

  ${({ background = {} }) => {
    switch (background.type) {
      case 'color':
        return css`
          background-color: ${background.hex};
        `;
      case 'img':
        return css`
          position: relative;
          background-color: rgba(18, 18, 18, 0.9);

          &:before {
            content: '';
            position: absolute;
            background: url(${background.src});
            background-size: cover;
            background-position: center center;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
          }
        `;
      default:
        return css`
          background-color: #121212;
        `;
    }
  }}
`;

export default DynamicBackground;
