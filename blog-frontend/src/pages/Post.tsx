import React, { Component } from 'react';
import { match as Match } from 'react-router';
import client from '../lib/Client';

interface IProps {
  match: Match<any>;
}

class Post extends Component<IProps> {
  public componentDidMount() {
    client.get(`/posts/${this.props.match.params.postId}`).then(response => {
      console.log(response);
    });
  }

  public render() {
    return <div />;
  }
}

export default Post;
