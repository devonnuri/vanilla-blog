import { Component } from 'react';
import client from '../lib/Client';

class Logout extends Component<any, any> {
  public componentDidMount() {
    client.post('/auth/logout');
    this.props.history.push('/');
  }

  public render() {
    return '';
  }
}

export default Logout;
