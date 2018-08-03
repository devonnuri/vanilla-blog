import React, { Component } from 'react';
import styled from 'styled-components';
import qs from 'query-string';

import AdminMenu from './AdminMenu';
import client from 'src/lib/Client';
import Pagination from 'src/components/Pagination';

const AdminContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
`;

class PostManager extends Component<any, any> {
  public componentDidMount() {
    client.get('/posts/1/10').then(response => {
      //tslint:disable
      console.log(response);
    });
  }

  public render() {
    const query = qs.parse(this.props.location.search);
    const page = query.page || 1;

    return (
      <AdminContainer>
        <AdminMenu />

        <Content>
          <h1>글 관리</h1>
          <Pagination active={Number(page)} length={5} />
        </Content>
      </AdminContainer>
    );
  }
}

export default PostManager;
