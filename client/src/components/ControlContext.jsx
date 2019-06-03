// @flow
import React, { createContext } from 'react';

const { Consumer, Provider } = createContext({
  limit: 20,
  offset: 0,
  total: 0,
  setContext: () => {},
  setLimit: () => {},
});

class ControlContext extends React.PureComponent<{
  children: JSX.Element
}, {
  limit: number,
  offset: number,
  total: number,
  setLimit: (number) => void,
  setOffset: (number) => void
}> {
  constructor(props: {children: JSX.Element}) {
    super(props);
    this.state = {
      limit: 20,
      offset: 0,
      total: 0,
      setTotal: (total: number): void => this.setState({ total }),
      setLimit: (limit: number): void => this.setState({ limit }),
      setOffset: (offset: number): void => this.setState({ offset }),
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

export const ControlConsumer = (Component): JSX.Element => (props): JSX.Element => (
  <Consumer>
    {(context): JSX.Element => <Component {...props} {...context} />}
  </Consumer>
);

export default ControlContext;
