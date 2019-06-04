// @flow
import React, { Fragment } from 'react';
import {
  Grid, withStyles, ThemedComponentProps, Theme, Styles, CircularProgress, Grow,
} from '@material-ui/core';
import { CharacterResult } from '../utils/fetcher';
import Character from './Character';
import { FetcherConsumer } from './FetcherContext';

type Props = ThemedComponentProps;

function CharactersGrid({
  characters, classes, loading,
}: Props): React.Element {
  return (
    <div className={classes.center}>
      <Grow in={loading}>
        <div className={classes.center}>
          {loading
          && (
            <Fragment>
              <br />
              <CircularProgress color="secondary" />
            </Fragment>
          )
          }
        </div>
      </Grow>

      <Grid
        className={classes.root}
        container
        spacing={4}
        justify="center"
        alignItems="center"
      >
        {characters.map((char: CharacterResult): React.Element => (
          <Grid item key={char.id}><Character {...char} /></Grid>
        ))}
      </Grid>
    </div>
  );
}

export default FetcherConsumer(withStyles((theme: Theme): Styles => ({
  root: {
    padding: theme.spacing(4),
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))(CharactersGrid));
