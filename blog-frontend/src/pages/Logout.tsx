import React, { Component } from 'react';
import client from '../lib/Client';
import { UserConsumer } from '../contexts/UserContext';

class Logout extends Component<any, any> {
  public async componentDidMount() {
    await client.post('/auth/logout').then(() => {
      this.props.setLogin(false);
    });
    this.props.history.push('/');
  }

  public render() {
    return '';
  }
}

const LogoutContainer = ({ ...rest }) => {
  return (
    <UserConsumer>
      {({ actions }: any) => {
        return <Logout setLogin={actions.setLogin} {...rest} />;
      }}
    </UserConsumer>
  );
};

export default LogoutContainer;
