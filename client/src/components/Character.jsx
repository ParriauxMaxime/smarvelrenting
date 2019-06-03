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
      <div className={classes.textContainer}>
        <Typography variant="h6" className={classes.name} align="center">
          {name}
        </Typography>
      </div>
    </Paper>
  );
}

export default withStyles((theme: Theme): Styles => ({
  root: {
    height: 320,
    width: 220,
    backgroundColor: '#000',
  },
  thumbnail: {
    borderBottom: '4px solid red',
    height: 200,
    width: '100%',
    backgroundSize: 'cover',
    backgroundPostion: 'center',
  },
  textContainer: {
    padding: theme.spacing(1),
  },
  name: {
    color: 'white',
  },
}))(Character);
