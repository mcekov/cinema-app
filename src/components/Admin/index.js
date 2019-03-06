import React from 'react';

import * as ROLES from '../../constants/roles';
import { withAuthorization } from '../Session';

const AdminPage = () => {
  return (
    <div>
      <h1>Admin</h1>
      <p>Restricted area! Only for users with the ADMIN role are authorized.</p>
    </div>
  );
};

// TODO ROLES
const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default withAuthorization(condition)(AdminPage);
