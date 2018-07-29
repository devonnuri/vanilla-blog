import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { match as Match } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { highlightBlock } from 'highlight.js';
import client from '../lib/Client';
import DisqusComments from 'src/components/DisqusComments';
import { Location } from 'history';
import { UserConsumer } from 'src/contexts/UserContext';

const PostContainer = styled.div`
  pre code {
    font-family: 'Roboto Mono';
  }

  .post-info {
    h1 {
      text-align: center;
      font-size: 3em;
    }

    .createdAt {
      text-align: right;
      color: #aaa;
    }

    margin-bottom: 2rem;
  }

  .post-article {
    font-size: 1.25em;

    h1,
    h2,
    h3 {
      border-bottom: 2px solid #ddd;
    }

    h1 {
      padding-bottom: 0.7rem;
    }
    h2 {
      padding-bottom: 0.5rem;
    }
    h3 {
      padding-bottom: 0.3rem;
    }

    blockquote {
      margin: 0;
      padding: 0.5rem 1rem;
      border-left: 3px solid #ddd;
      font-size: 1.3em;
      p {
        margin: 0;
      }
    }
  }

  #disqus_thread {
    margin-top: 3rem;
  }
`;

interface Props {
  match: Match<any>;
  location: Location;
}

interface State {
  post: {
    title: string;
    body: string;
    createdAt: Date;
  };
  exists: boolean;
  loaded: boolean;
}

class Post extends Component<Props, State> {
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

  public componentDidUpdate() {
    if (ReactDOM.findDOMNode(this)) {
      const node = ReactDOM.findDOMNode(this);

      if (node instanceof HTMLElement) {
        Array.from(node.querySelectorAll('pre code')).forEach(element => {
          highlightBlock(element);
        });
      }
    }
  }

  public render() {
    if (!this.state.loaded) {
      return <h2>로딩중입니다.</h2>;
    }

    if (!this.state.exists) {
      return <h2>존재하지 않는 포스트입니다.</h2>;
    }

    const { title, body, createdAt } = this.state.post;

    return (
      <PostContainer>
        <UserConsumer>{(a: any) => <div>{JSON.stringify(a)}</div>}</UserConsumer>
        <div className="post-info">
          <h1>{title}</h1>
          <p className="createdAt">{new Date(createdAt).toLocaleString()}</p>
        </div>
        <ReactMarkdown source={body} className="post-article" />
        <DisqusComments
          id={this.props.match.params.id}
          title={title}
          path={this.props.location.pathname}
        />
      </PostContainer>
    );
  }
}

export default Post;
