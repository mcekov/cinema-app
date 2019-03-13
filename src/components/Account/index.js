import React, { Fragment } from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';

const AccountPage = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <Fragment>
          <h1>Account: {authUser.email}</h1>
          <div className="row mt-5">
            <div className="col-md-6">
              <PasswordForgetForm />
              <PasswordChangeForm />
            </div>
          </div>
        </Fragment>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = authUser => authUser !== null;

export default withAuthorization(condition)(AccountPage);
