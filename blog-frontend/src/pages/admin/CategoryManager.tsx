import React, { Component } from 'react';
import styled from 'styled-components';

import AdminMenu from './AdminMenu';
import client from '../../lib/Client';

const AdminContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
`;

interface State {
  data: any;
}

class CategoryManager extends Component<any, State> {
  public state = {
    data: [],
  };

  public componentDidMount() {
    client.get('/categories/ROOT').then(response => {
      this.setState({ data: response.data });
    });
  }

  public render() {
    return (
      <AdminContainer>
        <AdminMenu />

        <Content>
          <h1>카테고리 관리</h1>

          <ul>
            {this.state.data.map((category: any) => (
              <li key={category.id}>
                {category.secret ? '🔒 ' : ''}
                {category.name}
              </li>
            ))}
          </ul>
        </Content>
      </AdminContainer>
    );
  }
}

export default CategoryManager;
