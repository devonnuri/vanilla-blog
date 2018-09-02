import React, { Component, FormEvent } from 'react';
import styled from 'styled-components';

import { MdCancel } from 'react-icons/md';

import AdminMenu from './AdminMenu';
import client from 'src/lib/Client';
import TextInput from 'src/components/TextInput';
import { AxiosError } from 'axios';

const AdminContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
`;

const TagList = styled.div`
  span {
    display: inline-block;
    margin: 0.2rem 0.4rem;
    padding: 0.4rem 0.7rem;
    border-radius: 15px;

    background-color: #eee;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

    cursor: pointer;
    transition: 0.2s box-shadow ease-in-out;

    svg {
      vertical-align: -10%;
      margin-right: 0.2rem;
    }

    &:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }
  }
`;

const InputContainer = styled.form`
  input {
    font-size: 1em;
  }
`;

interface State {
  data: any;
  inputValue: string;
}

class TagManager extends Component<any, State> {
  public state = {
    data: [],
    inputValue: '',
  };

  public componentDidMount() {
    client.get('/tags').then(response => {
      this.setState({ ...this.state, data: response.data });
    });
  }

  public handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    client
      .post(`/tags/create/${this.state.inputValue}`)
      .then(() => {
        this.setState({
          ...this.state,
          data: [...this.state.data, { name: this.state.inputValue }],
        });
      })
      .catch((error: AxiosError) => {
        if (error.code && error.code === '409') {
          alert('이미 있는 태그입니다.');
        } else {
          alert('태그 생성에 실패했습니다.');
        }
      });
  };

  public handleRemove = (e: any) => {
    const itemText = e.target.parentNode.parentNode.innerText;
    client
      .post(`/tags/delete/${itemText}`)
      .then(() => {
        this.setState({
          ...this.state,
          data: this.state.data.filter((data: any) => data.name !== itemText),
        });
      })
      .catch(() => {
        alert('태그 삭제에 실패했습니다.');
      });
  };

  public handleChange = (e: any) => {
    this.setState({ ...this.state, inputValue: e.target.value });
  };

  public render() {
    return (
      <AdminContainer>
        <AdminMenu />

        <Content>
          <h1>태그 관리</h1>

          <InputContainer onSubmit={this.handleSubmit}>
            <TextInput
              placeholder="추가 후 Enter키를 누르세요"
              value={this.state.inputValue}
              onChange={this.handleChange}
            />
          </InputContainer>

          <TagList>
            {this.state.data.map((data: any) => (
              <span key={data.name}>
                <MdCancel onClick={this.handleRemove} />
                {data.name}
              </span>
            ))}
          </TagList>
        </Content>
      </AdminContainer>
    );
  }
}

export default TagManager;
