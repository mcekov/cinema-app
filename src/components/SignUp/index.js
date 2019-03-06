import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Organize high-order components
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUp = () => {
  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
};

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();

    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });

        console.log(authUser);

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

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Username"
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
            placeholder="Email"
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
            placeholder="Confirm Password"
            value={passwordTwo}
            onChange={this.onChange}
          />
        </div>

        <button className="btn btn-primary" disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {/* <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={this.onChange}
          value={username}
        />
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          onChange={this.onChange}
          value={email}
        />
        <input
          type="password"
          name="passwordOne"
          placeholder="Password"
          onChange={this.onChange}
          value={passwordOne}
        />
        <input
          type="password"
          name="passwordTwo"
          placeholder="Confirm Password"
          onChange={this.onChange}
          value={passwordTwo}
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button> */}

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Dont't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUp;

export { SignUpForm, SignUpLink };
