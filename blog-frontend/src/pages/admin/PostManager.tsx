import React, { Component } from 'react';
import styled from 'styled-components';

import AdminMenu from './AdminMenu';
import client from '../../lib/Client';
import Pagination from 'src/components/Pagination';

const AdminContainer = styled.div`
  margin: 2rem 0;
`;

class PostManager extends Component {
  public componentDidMount() {
    client.get('/posts/1/10').then(response => {
      //tslint:disable
      console.log(response);
    });
  }

  public render() {
    return (
      <AdminContainer>
        <AdminMenu />
        <h1>글 관리</h1>
        <Pagination active={1} length={5} />
      </AdminContainer>
    );
  }
}

export default PostManager;
