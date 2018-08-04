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

  table {
    width: 100%;
  }
`;

const PostTable = styled.table`
  margin: 2rem 0;
`;

interface State {
  page: number;
  data: any;
}

class PostManager extends Component<any, State> {
  public state = {
    page: 1,
    data: [],
  };

  public componentDidMount() {
    const query = qs.parse(this.props.location.search);
    const page = Number(query.page) || 1;

    this.setState({ ...this.state, page });

    client.get(`/posts/${page * 10 + 1}/10`).then(response => {
      this.setState({ ...this.state, data: response.data });
    });
  }

  public render() {
    return (
      <AdminContainer>
        <AdminMenu />

        <Content>
          <h1>글 관리</h1>

          <PostTable>
            <tr>
              <th>ID</th>
              <th>제목</th>
              <th>작성 시간</th>
            </tr>
            {this.state.data.map((post: any) => (
              <tr>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{new Date(post.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </PostTable>

          <Pagination active={this.state.page} length={5} />
        </Content>
      </AdminContainer>
    );
  }
}

export default PostManager;
