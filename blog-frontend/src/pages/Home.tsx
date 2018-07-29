import React, { Component } from 'react';
import client from '../lib/Client';

import Item from '../components/Item';
import removeMd from 'remove-markdown';

import 'highlight.js/styles/atom-one-dark.css';
import { InfiniteScroll } from 'src/components/InfiniteScroll';

interface IPost {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
}

interface Props {
  history?: any;
}

interface State {
  posts: object[];
  loaded: boolean;
  cursor: number;
}

class Home extends Component<Props, State> {
  public state = {
    posts: [],
    loaded: false,
    cursor: 1,
  };

  public loadMore = () => {
    this.setState({ ...this.state, loaded: false });
    client.get(`/posts/${this.state.cursor}/3`).then(response => {
      this.setState({
        posts: this.state.posts.concat(...response.data),
        cursor: this.state.cursor + response.data.length,
        loaded: true,
      });
    });
  };

  public componentDidMount() {
    this.loadMore();
  }

  public render() {
    return (
      <div>
        <InfiniteScroll
          throttle={100}
          threshold={300}
          isLoading={!this.state.loaded}
          hasMore={!!this.state.cursor}
          onLoadMore={this.loadMore}
        >
          {this.state.posts.length > 0
            ? this.state.posts
                .sort((a: IPost, b: IPost) => b.id - a.id)
                .map((post: IPost) => (
                  <Item
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    body={removeMd(post.body)}
                    createdAt={post.createdAt}
                  />
                ))
            : ''}
        </InfiniteScroll>
        {!this.state.loaded && <h2>로딩중입니다...</h2>}
      </div>
    );
  }
}

export default Home;
