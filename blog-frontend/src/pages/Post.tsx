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
  const query = posts.filter(post => Number(match.params.postId) === post.id);

  if (query.length < 1) {
    return (
      <div>
        <h1>해당 포스트는 존재하지 않습니다.</h1>
      </div>
    );
  }

  const { title, body } = query[0];
  return (
    <div>
      <h1>{title}</h1>
      <ReactMarkdown source={body} />
    </div>
  );
};

export default Post;
