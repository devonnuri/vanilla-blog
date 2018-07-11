import React from 'react';

import { match as Match } from 'react-router-dom';

const Post = ({ match }: { match: Match<any> }) => {
  return (
    <div>
      <h1>
        {match.params.postId} Post of {match.params.username}
      </h1>
    </div>
  );
};

export default Post;
