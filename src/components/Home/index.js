import React from 'react';

import { withAuthorization } from '../Session';

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>The Home Page is accessible by every logged in user.</p>
    </div>
  );
};

const condition = authUser => authUser !== null;

export default withAuthorization(condition)(HomePage);
