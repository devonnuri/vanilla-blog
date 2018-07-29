import React, { Component, createContext } from 'react';

const Context = createContext(null);

const { Provider, Consumer: UserConsumer } = Context;

class UserProvider extends Component {
  public state = {
    login: false,
  };

  public actions = {
    setLogin: (login: boolean) => {
      this.setState({ login });
    },
  };

  public render() {
    const value: any = { state: this.state, actions: this.actions };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { UserProvider, UserConsumer };
