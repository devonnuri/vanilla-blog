import React, { Component } from 'react';
import styled from 'styled-components';

import AdminMenu from './AdminMenu';
import client from 'src/lib/Client';

const AdminContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
`;

const TagList = styled.div`
  span {
    padding: 0.5rem 1rem;
    border-radius: 15px;

    background-color: #eee;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    cursor: pointer;

    transition: 0.2s box-shadow ease-in-out;

    &:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }
  }
`;

interface State {
  data: any;
}

class TagManager extends Component<any, State> {
  public state = {
    data: [],
  };

  public componentDidMount() {
    client.get('/tags').then(response => {
      this.setState({ ...this.state, data: response.data });
    });
  }

  public render() {
    return (
      <AdminContainer>
        <AdminMenu />

        <Content>
          <h1>태그 관리</h1>

          <TagList>
            {this.state.data.map((data: any) => (
              <span>{data.name}</span>
            ))}
          </TagList>
        </Content>
      </AdminContainer>
    );
  }
}

export default TagManager;
