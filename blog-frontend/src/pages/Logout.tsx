import React, { Component } from 'react';
import client from '../lib/Client';
import LoginContext from '../contexts/LoginContext';

class Logout extends Component<any, any> {
  public state = {
    login: true,
  };

  public async componentDidMount() {
    await client.post('/auth/logout').then(() => {
      this.setState({
        login: false,
      });
    });
    this.props.history.push('/');
  }

  public render() {
    return <LoginContext.Provider value={this.state} />;
  }
}

export default Logout;
