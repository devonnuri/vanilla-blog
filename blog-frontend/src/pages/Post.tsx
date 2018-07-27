import React, { Component } from 'react';
import { match as Match } from 'react-router';
import client from '../lib/Client';

interface IProps {
  match: Match<any>;
}

interface IState {
  post: {
    title: string;
    body: string;
    createdAt: Date;
  };
  exists: boolean;
  loaded: boolean;
}

class Post extends Component<IProps, IState> {
  public state = {
    post: {
      title: '',
      body: '',
      createdAt: new Date(0),
    },
    exists: true,
    loaded: false,
  };

  public componentDidMount() {
    client
      .get(`/posts/${this.props.match.params.postId}`)
      .then(response => {
        this.setState({ ...this.state, post: response.data, loaded: true });
      })
      .catch(error => {
        this.setState({
          post: {
            title: '',
            body: '',
            createdAt: new Date(0),
          },
          exists: false,
          loaded: true,
        });
      });
  }

  public render() {
    if (this.state.exists && !this.state.loaded) {
      return <h2>로딩중입니다.</h2>;
    } else if (!this.state.exists && this.state.loaded) {
      return <h2>존재하지 않는 포스트입니다.</h2>;
    }

    const { title, body, createdAt } = this.state.post;

    return (
      <div>
        <h1>{title}</h1>
        <p>{createdAt}</p>
        <p>{body}</p>
      </div>
    );
  }
}

export default Post;
