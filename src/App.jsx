import { blue, green, grey, red } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'normalize.css';
import React from 'react';
import ContextProvider from './context/provider';
import Router from './router/Router';
import GlobalStyle from './styles/GlobalStyle';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blue.A400
    },
    secondary: {
      main: green.A400,
      contrastText: '#fff'
    },
    warning: {
      main: red.A200,
      contrastText: '#fff'
    },
    background: {
      default: grey[900],
      paper: grey[900]
    }
  }
});

export default function App() {
  return (
    <>
      <GlobalStyle />
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </ContextProvider>
    </>
  );
}
