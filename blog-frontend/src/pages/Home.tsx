import React, { Component } from 'react';
import client from '../lib/Client';

import Item from '../components/Item';
import removeMd from 'remove-markdown';

interface IPost {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
}

class Home extends Component {
  public state = {
    posts: [],
  };

  public componentDidMount() {
    client.get('/posts/list').then(response => {
      this.setState({ posts: response.data });
    });
  }

  public render() {
    return (
      <div>
        {this.state.posts.length < 1 && <h3>아직 아무 포스트도 없습니다!</h3>}

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
