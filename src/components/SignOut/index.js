import React from 'react';
import { withFirebase } from '../Firebase';

const SignOut = ({ firebase }) => {
  return (
    <button className="btn nav-link" type="button" onClick={firebase.doSignOut}>
      SignOut
    </button>
  );
};

export default withFirebase(SignOut);
