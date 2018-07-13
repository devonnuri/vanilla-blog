import React from 'react';

import { match as Match } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: 'First Post',
    body: 'This is the body',
  }
];

const Post = ({ match }: { match: Match<any> }) => {
  return (
    <div>
      <h1>Post of {match.params.postId}</h1>
    </div>
  );
};

export default Post;
