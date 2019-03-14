import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Organize high-order components
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { SignInLink } from '../SignIn';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const SignUp = () => {
  return (
    <div>
      <SignUpForm />
    </div>
  );
};

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();

    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in Firebase realtime db
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles
        });
      })
      .then(() => {
        // Set state to initial empty state
        this.setState({ ...INITIAL_STATE });

        // Redirect after user signup
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Fragment>
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card ">
              <h5 className="card-header">Create Account</h5>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      placeholder="Enter username"
                      onChange={this.onChange}
                      value={username}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      onChange={this.onChange}
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordOne">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="passwordOne"
                      name="passwordOne"
                      placeholder="Enter Desired Password"
                      value={passwordOne}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordTwo">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="passwordTwo"
                      name="passwordTwo"
                      placeholder="Confirm password"
                      value={passwordTwo}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group form-check">
                    <div className="custom-control custom-checkbox">
                      <input
                        className="custom-control-input"
                        type="checkbox"
                        id="admin-checkbox"
                        name="isAdmin"
                        checked={isAdmin}
                        onChange={this.onChangeCheckbox}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="admin-checkbox"
                      >
                        Admin
                      </label>
                    </div>
                  </div>

                  <button
                    className="btn btn-danger btn-block"
                    disabled={isInvalid}
                    type="submit"
                  >
                    Sign Up
                  </button>
                  <SignInLink />
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            {error && (
              <div
                className="alert alert-danger alert-dismissible"
                role="alert"
              >
                <button type="button" className="close" data-dismiss="alert">
                  &times;
                </button>
                <strong>{error.message}</strong>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

const SignUpLink = () => (
  <p>
    <Link
      className="float-right btn btn-outline-primary mb-2"
      to={ROUTES.SIGN_UP}
    >
      Register account
    </Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUp;

export { SignUpForm, SignUpLink };
