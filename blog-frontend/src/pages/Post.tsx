import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ReactMarkdown from 'react-markdown';
import { match as Match } from 'react-router-dom';

const query = gql`
  query getPost($postId: Int!) {
    post(id: $postId) {
      title
      body
      createdAt
    }
  }
`;

const Post = ({
  match: {
    params: { postId },
  },
}: {
  match: Match<any>;
}) => {
  // match.params.postId
  return (
    <Query query={query} variables={{ postId }}>
      {({ loading, data, error }) => {
        if (loading) {
          return <h3>Loading</h3>;
        }
        if (error) {
          return <h3>Error Occurred</h3>;
        }

        if (data.post.length < 1) {
          return <h2>존재하지 않는 포스트입니다.</h2>;
        }

        const post = data.post[0];

        return (
          <div>
            <h1>{post.title}</h1>
            <p>{new Date(post.createdAt).toLocaleString()}</p>
            <ReactMarkdown source={post.body} />
          </div>
        );
      }}
    </Query>
  );
};

export default Post;
