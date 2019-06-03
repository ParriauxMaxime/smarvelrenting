// @flow
import React, { useState, useEffect } from 'react';
import {
  Select, MenuItem, ThemedComponentProps, Theme, Styles, withStyles, FormControl, InputLabel, FormHelperText, IconButton, Typography, TextField,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { ControlConsumer } from './ControlContext';

type Props = ThemedComponentProps | {
  limit: number,
  offset: number
};

function Controls({
  classes, limit, total, offset, setLimit, setOffset,
}: Props): React.Element {
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(Math.floor(offset / limit));
  }, [offset, limit]);
  const canPrev = (): boolean => (offset - limit) >= 0;
  const canNext = (): boolean => (offset < total);
  const goPrev = (): void => setOffset((offset - limit) < 0 ? 0 : (offset - limit));
  const goNext = (): void => setOffset((offset + limit > total) ? (total - limit) : (offset + limit));
  return (
    <div className={classes.root}>
      <div className={classes.navigate}>
        <IconButton disabled={!canPrev()} onClick={goPrev}>
          <NavigateBeforeIcon />
        </IconButton>
      </div>
      <div className={classes.navigate}>
        <Typography>
          {'Page '}
        </Typography>
        <TextField
          onChange={(event: Event) => {
            let { value } = event.target;
            if (value < 0) { value = 0; }
            if (value > Math.floor(total / limit)) { value = Math.floor(total / limit); }
            setPage(value);
            setOffset(value * limit);
          }}
          value={page}
          type="number"
        />
        <Typography>
          {' sur '}
          {Math.floor(total / limit)}
        </Typography>
        <Typography>
          {offset}
          {' - '}
          {(offset + limit - 1) > total ? total : (offset + limit - 1)}
          {' sur '}
          {total}
        </Typography>
      </div>
      <div className={classes.navigate}>
        <IconButton disabled={!canNext()} onClick={goNext}>
          <NavigateNextIcon />
        </IconButton>
      </div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="limit">Limite</InputLabel>
        <Select
          value={limit}
          variant="filled"
          onChange={(event: Event): void => setLimit(event.target.value)}
          name="limit"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
        <FormHelperText>Nombre d&apos;éléments par page</FormHelperText>
      </FormControl>
    </div>
  );
}

export default ControlConsumer(withStyles((theme: Theme): Styles => ({
  root: {
    marginTop: theme.spacing(1),
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 'auto',
  },
  navigate: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))(Controls));
