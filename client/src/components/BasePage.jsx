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
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h1" color="secondary" className={classes.title}>
            {'SmarvelRenting'}
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <div className={classes.container} />
        {children}
      </div>
    </React.Fragment>
  );
}

export default withStyles((theme): Styles => ({
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
  container: theme.mixins.toolbar,
}))(BasePage);
