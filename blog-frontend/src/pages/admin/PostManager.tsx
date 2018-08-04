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
  count: number;
}

class PostManager extends Component<any, State> {
  public state = {
    page: 1,
    data: [],
    count: 1,
  };

  public componentDidMount() {
    const query = qs.parse(this.props.location.search);
    const page = Number(query.page) || 1;

    this.setState({ ...this.state, page });

    client.get('/posts/count').then(response => {
      this.setState({ ...this.state, count: response.data.count });
    });

    client.get(`/posts/${(page - 1) * 10 + 1}/10`).then(response => {
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
            <thead>
              <tr>
                <th>ID</th>
                <th>제목</th>
                <th>작성 시간</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((post: any) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{new Date(post.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </PostTable>

          <Pagination active={this.state.page} length={Math.ceil(this.state.count / 10)} />
        </Content>
      </AdminContainer>
    );
  }
}

export default PostManager;
