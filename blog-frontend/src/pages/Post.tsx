import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { RouteComponentProps } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { highlightBlock } from 'highlight.js';
import client from '../lib/Client';
import DisqusComments from 'src/components/DisqusComments';
import Button from 'src/components/Button';

const PostContainer = styled.div`
  .post-info {
    margin-bottom: 2rem;

    h1 {
      text-align: center;
      font-size: 3em;
    }

    .createdAt {
      text-align: right;
      color: #aaa;
    }

    .button-set {
      text-align: right;

      .button {
        display: inline-block;

        border-right: 2px #2980b9 solid;
        padding: 0.5rem 1.2rem;

        &:first-child {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }

        &:last-child {
          border: none;

          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }

    .tag-list {
      color: #555;
      span {
        margin: 0 0.3rem;
      }
    }
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
      border-left: 4px solid #ddd;
      font-size: 1.3em;
      p {
        margin: 0;
      }
    }

    img {
      width: 100%;
      height: auto;
    }

    code {
      font-family: "Roboto Mono";

      &:not(.hljs) {
        background-color: #eee;
        border-radius: 5px;
        padding: 0.1rem 0.2rem;
      }
    }
  }

  #disqus_thread {
    margin-top: 3rem;
  }
`;

interface Props extends RouteComponentProps<any> {}

interface State {
  post: {
    title: string;
    body: string;
    tags: string[];
    createdAt: Date;
  };
  exists: boolean;
  loaded: boolean;
  login: boolean;
}

class Post extends Component<Props, State> {
  public state = {
    post: {
      title: '',
      body: '',
      tags: [],
      createdAt: new Date(0),
    },
    exists: true,
    loaded: false,
    login: false,
  };

  public componentDidMount() {
    client
      .get(`/posts/${this.props.match.params.postId}`)
      .then(response => {
        this.setState({ ...this.state, post: response.data, loaded: true });

        document.title = this.state.post.title + ' - devon.log';
      })
      .catch(error => {
        this.setState({
          ...this.state,
          post: {
            title: '',
            body: '',
            tags: [],
            createdAt: new Date(0),
          },
          exists: false,
          loaded: true,
        });
      });

    client
      .post('/auth/checklogin')
      .then(() => {
        this.setState({ ...this.state, login: true });
      })
      .catch(() => {
        this.setState({ ...this.state, login: false });
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

  public onDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (confirm('정말로 삭제하시겠습니까?')) {
      const postId = this.props.match.params.postId;
      client
        .post(`/posts/delete/${postId}`)
        .then(() => {
          alert('포스트를 삭제했습니다.');
          this.props.history.push('/');
        })
        .catch(() => {
          alert('포스트 삭제에 실패했습니다.');
        });
    }
  };

  public render() {
    if (!this.state.loaded) {
      return <h2>로딩중입니다.</h2>;
    }

    if (!this.state.exists) {
      return <h2>존재하지 않는 포스트입니다.</h2>;
    }

    const { title, body, createdAt, tags } = this.state.post;
    const { postId } = this.props.match.params;

    return (
      <PostContainer>
        <div className="post-info">
          <h1>{title}</h1>
          <p className="createdAt">{new Date(createdAt).toLocaleString()}</p>
          <div className="tag-list">
            {tags.map(tag => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
          {this.state.login ? (
            <div className="button-set">
              <Button to={`/admin/edit/${postId}`}>수정</Button>
              <Button className="red" onClick={this.onDeleteClick}>
                삭제
              </Button>
            </div>
          ) : (
            ''
          )}
        </div>
        <ReactMarkdown source={body} className="post-article" />
        <DisqusComments
          id={this.props.match.params.postId}
          title={title}
          path={this.props.location.pathname}
        />
      </PostContainer>
    );
  }
}

export default Post;
