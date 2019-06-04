// @flow
import React, { useState, useEffect } from 'react';
import {
  Select,
  MenuItem,
  ThemedComponentProps,
  Theme,
  Styles,
  withStyles,
  FormControl,
  InputLabel,
  FormHelperText,
  IconButton,
  Typography,
  TextField,
  Grid,
  Hidden,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { ControlConsumer } from './ControlContext';
import { FetcherConsumer } from './FetcherContext';


/**
 * Yeah, I could have breaked that in multiple files :)
 */

type Props = ThemedComponentProps | {
  limit: number,
  offset: number
};

const TIMEOUT = 500;

function Controls({
  classes, limit, total, offset, setLimit, setOffset, fetch, cancel,
}: Props): React.Element {
  const [page, setPage] = useState(1);

  let timeout = null;
  const cancelWrapper = (func, time = TIMEOUT) => {
    timeout = setTimeout(() => {
      if (timeout !== null) {
        cancel();
        clearInterval(timeout);
      }
      timeout = null;
      func();
    }, time);
  };
  useEffect(() => {
    setPage(Math.floor(offset / limit) + 1);
    cancelWrapper(() => fetch({ limit, offset }), 0);
    return cancel || (() => null);
  }, [offset, limit]);

  const canPrev = (): boolean => (offset - limit) >= 0;
  const canNext = (): boolean => (offset < total);

  const goPrev = () => {
    setOffset((offset - limit) < 0
      ? 0
      : (offset - limit));
  };
  const goNext = () => {
    setOffset((offset + limit > total)
      ? (total - limit)
      : (offset + limit));
  };

  const onTextFieldChange = (event: Event) => {
    const { value: v } = event.target;
    if (v === '') {
      setPage(v);
      return;
    }
    let value = parseInt(v || '0', 10);
    if (value < 0) { value = 0; }
    if (value > Math.floor(total / limit)) {
      value = Math.floor(total / limit) + 1;
    }
    setPage(value);
    if (value !== 0) {
      setOffset((value - 1) * limit);
    }
  };

  return (
    <Grid
      container
      spacing={4}
      justify="center"
      alignItems="center"
      className={classes.grid}
    >
      <Grid item sm={12} md={6}>
        <div className={classes.flex}>
          <IconButton disabled={!canPrev()} onClick={goPrev}>
            <NavigateBeforeIcon />
          </IconButton>
          <div className={classes.pageInputContainer}>
            <Typography>
              {'Page '}
            </Typography>
            <TextField
              className={classes.pageInput}
              inputProps={{
                className: classes.pageInput,

              }}
              onChange={onTextFieldChange}
              value={page}
              type="number"
            />
            <Typography>
              {' sur '}
              {Math.floor(total / limit) + 1}
            </Typography>
          </div>
          <IconButton disabled={!canNext()} onClick={goNext}>
            <NavigateNextIcon />
          </IconButton>
        </div>
      </Grid>
      <Grid item sm={12} md={6}>
        <div className={classes.flex}>

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
      </Grid>
      <Hidden xsDown>
        <Grid item sm={12}>
          <div className={classes.flex}>
            <Typography>
              {offset + 1}
              {' - '}
              {(offset + limit - 1) > total ? total + 1 : (offset + limit)}
              {' sur '}
              {total}
            </Typography>
          </div>
        </Grid>
      </Hidden>
    </Grid>
  );
}

export default ControlConsumer(
  FetcherConsumer(
    withStyles((theme: Theme): Styles => ({
      grid: {
        marginTop: theme.spacing(1),
      },
      flex: {
        display: 'flex',
        justifyContent: 'center',
      },
      pageInput: {
        width: '3em',
        color: theme.palette.secondary.main,
        textAlign: 'center',
      },
      pageInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        minWidth: 200,
        justifyContent: 'center',
        alignItems: 'center',
      },
    }))(Controls),
  ),
);
