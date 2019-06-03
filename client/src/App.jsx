// @flow
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';
import BasePage from './components/BasePage';
import CharactersGrid from './components/CharactersGrid';
import Controls from './components/Controls';
import ControlContext, { ControlConsumer } from './components/ControlContext';

function App(): React.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BasePage>
        <ControlContext>
          <Controls />
          <CharactersGrid />
        </ControlContext>
      </BasePage>
    </MuiThemeProvider>
  );
}

export default process.env.NODE_ENV === 'production' ? App : hot(App);
