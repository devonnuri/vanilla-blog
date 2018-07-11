import React from 'react';

import { match as Match } from 'react-router-dom';

const Profile = ({ match }: { match: Match<any> }) => {
  return (
    <div>
      <h1>Profile of {match.params.username}</h1>
    </div>
  );
};

export default Profile;
