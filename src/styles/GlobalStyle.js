import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  div#root {
    width: 100%;
    height: 100%;
    font-family: "Roboto", sans-serif;
  }
`;

export default GlobalStyles;
