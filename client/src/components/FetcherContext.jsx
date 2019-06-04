/* eslint-disable react/no-unused-state */
// @flow
import React, { createContext } from 'react';
import axios, { Canceler } from 'axios';
import { CharacterResult } from '../utils/fetcher';
import { ControlConsumer } from './ControlContext';

const { Consumer, Provider } = createContext({
  cancel: () => {},
  fetch: () => {},
  loading: false,
  characters: [],
});

class FetcherContext extends React.PureComponent<{
  children: JSX.Element,
  setTotal: (total: number) => void
}, {
  cancel: Canceler,
  loading: boolean,
  fetch: ({limit: number, offset: number}) => Promise<CharacterResult[]>,
  characters: CharacterResult[]
}> {
  constructor(props: {children: JSX.Element}) {
    super(props);
    this.state = {
      cancel: () => {},
      fetch: (params) => {
        const source = axios.CancelToken.source();
        this.setState({ cancel: source.cancel, loading: true });
        return axios.get(`http://localhost:8080/?limit=${params.limit}&offset=${params.offset}`, {
          cancelToken: source.token,
        }).then((res: Response): Response => {
          if (res.status && res.status === 429) {
            throw new Error('Too many request ');
          }
          return res;
        }).then((res: Response): Data => res.data)
          .then((res: Data): CharacterResult[] => {
            props.setTotal(res.data.total);
            return res.data.results;
          })
          .then((characters: CharacterResult[]) => {
            this.setState({ characters, loading: false });
          })
          .catch((err) => {
            if (!axios.isCancel(err)) {
              console.error(err);
            }
          });
      },
      characters: [],
    };
  }

  render(): JSX.Element {
    const { children } = this.props;
    return (
      <Provider value={this.state}>
        {children}
      </Provider>
    );
  }
}

export const FetcherConsumer = (Component): JSX.Element => (props): JSX.Element => (
  <Consumer>
    {(context): JSX.Element => <Component {...props} {...context} />}
  </Consumer>
);

export default ControlConsumer(FetcherContext);
