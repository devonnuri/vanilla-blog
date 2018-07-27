import React, { Component } from 'react';
import TextInput from 'src/components/TextInput';
import Button from 'src/components/Button';
import client from '../lib/Client';
import { AxiosError } from 'axios';

class Login extends Component<any, any> {
  public state = {
    username: '',
    password: '',
  };

  public onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    client
      .post('/auth/login', {
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        this.props.history.push('/');
      })
      .catch((error: AxiosError) => {
        if (!error.response) {
          return;
        }

        alert('계정이 올바르지 않습니다');

        this.setState({
          username: '',
          password: '',
        });
      });
  };

  public render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>로그인</h1>
        <p>
          <i>이거 성공하면 ㄹㅇ 킹갓해커 되는거임?</i>
        </p>
        <TextInput
          type="text"
          placeholder="사용자 이름"
          onChange={(e: any) => {
            this.setState({
              username: e.target.value,
            });
          }}
          value={this.state.username}
        />
        <TextInput
          type="password"
          placeholder="비밀번호"
          onChange={(e: any) => {
            this.setState({
              password: e.target.value,
            });
          }}
          value={this.state.password}
        />
        <Button theme="push" type="submit" large fullWidth>
          로그인
        </Button>
      </form>
    );
  }
}

export default Login;