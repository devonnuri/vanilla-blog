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
    loaded: false,
  };

  public componentDidMount() {
    client
      .get('/posts/1/1')
      .then(response => {
        this.setState({ posts: response.data, loaded: true });
      })
      .catch(error => {
        this.setState({ ...this.state, loaded: true });
      });
  }

  public render() {
    return (
      <div>
        {this.state.posts.length < 1 &&
          (this.state.loaded ? <h2>포스트가 하나도 없네요 ;)</h2> : <h2>로딩중입니다...</h2>)}

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
      </div>
    );
  }
}

export default Home;
