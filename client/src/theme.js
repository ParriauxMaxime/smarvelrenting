import { createMuiTheme } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#151515',
    },
    secondary: red,
  },
});

export default theme;
