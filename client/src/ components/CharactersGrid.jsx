// @flow
import React, { useState } from 'react';
import {
  Grid, withStyles, ThemedComponentProps, Theme, Styles,
} from '@material-ui/core';
import fetcher, { CharacterResult } from '../utils/fetcher';
import Character from './Character';

type Props = ThemedComponentProps;

function CharactersGrid({ classes }: Props): React.Element {
  const [characters, setCharacters] = useState([]);
  fetcher().then((charactersRes: CharacterResult[]): void => setCharacters(charactersRes));
  return (
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
  );
}

export default withStyles((theme: Theme): Styles => ({
  root: {
    padding: theme.spacing(4),
  },
}))(CharactersGrid);
