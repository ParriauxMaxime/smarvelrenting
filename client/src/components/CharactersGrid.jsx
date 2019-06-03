// @flow
import React, { useState, useEffect } from 'react';
import {
  Grid, withStyles, ThemedComponentProps, Theme, Styles,
} from '@material-ui/core';
import fetcher, { CharacterResult, Data } from '../utils/fetcher';
import Character from './Character';
import { ControlConsumer } from './ControlContext';

type Props = ThemedComponentProps;

function CharactersGrid({
  classes, limit, offset, setTotal,
}: Props): React.Element {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetcher({ limit, offset })
      .then((res: Data): CharacterResult[] => {
        setTotal(res.data.total);
        return res.data.results;
      })
      .then((charactersRes: CharacterResult[]): void => setCharacters(charactersRes))
      .catch(err => console.error(err));
  }, [offset, limit]);
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

export default ControlConsumer(withStyles((theme: Theme): Styles => ({
  root: {
    padding: theme.spacing(4),
  },
}))(CharactersGrid));
