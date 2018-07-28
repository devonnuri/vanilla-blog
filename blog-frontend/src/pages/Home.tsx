import React, { Component } from 'react';
import client from '../lib/Client';

import Item from '../components/Item';
import removeMd from 'remove-markdown';

import 'highlight.js/styles/atom-one-dark.css';

interface IPost {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
}

interface IProps {
  history?: any;
}

class Home extends Component<IProps> {
  public state = {
    posts: [],
  };

  public componentDidMount() {
    client.get('/posts/1/1').then(response => {
      this.setState({ posts: response.data });
    });
  }

  public render() {
    return (
      <form>
        {this.state.posts.length < 1 && <h2>로딩중입니다..</h2>}

        {this.state.posts
          .slice()
          .sort((a: IPost, b: IPost) => b.id - a.id)
          .map((post: IPost) => (
            <Item
              key={post.id}
              id={post.id}
              title={post.title}
              body={removeMd(post.body)}
              createdAt={post.createdAt}
            />
          ))}
      </form>
    );
  }
}

export default Home;
