// @flow
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';
import BasePage from './components/BasePage';
import CharactersGrid from './components/CharactersGrid';
import Controls from './components/Controls';
import ControlContext from './components/ControlContext';
import FetcherContext from './components/FetcherContext';

function App(): React.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BasePage>
        <ControlContext>
          <FetcherContext>
            <Controls />
            <CharactersGrid />
          </FetcherContext>
        </ControlContext>
      </BasePage>
    </MuiThemeProvider>
  );
}

export default process.env.NODE_ENV === 'production' ? App : hot(App);
