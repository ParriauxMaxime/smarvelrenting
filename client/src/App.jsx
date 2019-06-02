// @flow
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';
import BasePage from './ components/BasePage';
import CharactersGrid from './ components/CharactersGrid';

function App(): React.Element {
  fetch('http://localhost:8080/?limit=50&offset=100').then((res: Response): string => res.json()).then((res: Object): void => console.log(res));
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BasePage>
        <CharactersGrid />
      </BasePage>
    </MuiThemeProvider>
  );
}

export default process.env.NODE_ENV === 'production' ? App : hot(App);
