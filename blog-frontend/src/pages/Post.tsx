import React from 'react';

import ReactMarkdown from 'react-markdown';
import { match as Match } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: 'First Post',
    body: 'This is the body',
  },
  {
    id: 2,
    title: 'Second Post',
    body: 'This is the **second** body~',
  },
];

const Post = ({ match }: { match: Match<any> }) => {
  const { title, body } = posts[match.params.postId];
  return (
    <div>
      <h1>{title}</h1>
      <ReactMarkdown source={body} />
    </div>
  );
};

export default Post;
