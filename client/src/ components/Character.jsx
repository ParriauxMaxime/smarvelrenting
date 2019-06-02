// @flow
import React from 'react';
import {
  Paper, withStyles, ThemedComponentProps, Theme, Styles, Typography,
} from '@material-ui/core';
import { CharacterResult } from '../utils/fetcher';

type Props = CharacterResult | ThemedComponentProps;

function Character({ name, thumbnail, classes }: Props): React.Element {
  const imgUrl = `${thumbnail.path}.${thumbnail.extension}`;
  return (
    <Paper classes={{ root: classes.root }}>
      <div
        style={{ backgroundImage: `url(${imgUrl})` }}
        className={classes.thumbnail}
      />
      <Typography variant="h6" className={classes.name} align="center">
        {name}
      </Typography>
    </Paper>
  );
}

export default withStyles((theme: Theme): Styles => ({
  root: {
    height: 280,
    width: 220,
    padding: theme.spacing(1),
    backgroundColor: '#888',
  },
  thumbnail: {
    height: 200,
    width: 200,
    backgroundSize: 'cover',
    backgroundPostion: 'center',
  },
  name: {
    color: 'red',
  },
}))(Character);
