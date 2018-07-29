import React, { Component } from 'react';
import { UserProvider } from './UserContext';

interface State {
  login: boolean;
}

class Provider extends Component<any, State> {
  public state = {
    login: false,
  };

  public render() {
    return <UserProvider>{this.props.children}</UserProvider>;
  }
}

export default Provider;
