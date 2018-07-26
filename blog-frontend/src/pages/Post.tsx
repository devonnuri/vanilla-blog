import React from 'react';

// import ReactMarkdown from 'react-markdown';
import { match as Match } from 'react-router-dom';

const Post = ({
  match: {
    params: { postId },
  },
}: {
  match: Match<any>;
}) => {
  // match.params.postId
  return <h2>This is the Post {postId}.</h2>;
};

export default Post;
