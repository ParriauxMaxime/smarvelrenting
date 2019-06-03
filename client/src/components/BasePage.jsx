// @flow
import React from 'react';
import {
  AppBar, Toolbar, Typography, ThemedComponentProps, withStyles, Styles,
} from '@material-ui/core';

type Props = ThemedComponentProps | {
  children: React.Element
};

function BasePage({ children, classes }: Props): React.Element {
  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h1" className={classes.title}>
            {'SmarvelRenting'}
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </React.Fragment>
  );
}

export default withStyles((): Styles => ({
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
}))(BasePage);
