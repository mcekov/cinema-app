import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';

// Organize high-order components
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignIn = () => {
  return (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
    </div>
  );
};

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });

        // Redirect after user signin
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <Fragment>
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card">
              <h5 className="card-header">Log in or sign up</h5>
              <div className="card-body">
                <SignUpLink />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={this.onChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.onChange}
                    />
                  </div>

                  <button
                    className="btn btn-danger btn-block"
                    disabled={isInvalid}
                    type="submit"
                  >
                    Sign In
                  </button>
                  <PasswordForgetLink />
                </form>
              </div>
            </div>
          </div>
        </div>

        <br />
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

const SignInLink = () => (
  <p className="mt-4 text-center">
    <Link to={ROUTES.SIGN_IN}>Already have an account?</Link>
  </p>
);

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignIn;
export { SignInForm, SignInLink };
