import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForget = () => {
  return (
    <div>
      <PasswordForgetForm />
    </div>
  );
};

const INITIAL_STATE = {
  emaail: '',
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();

    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';

    return (
      <Fragment>
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card">
              <h5 className="card-header">Reset my password</h5>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      value={this.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <button
                    className="btn btn-danger"
                    disabled={isInvalid}
                    type="submit"
                  >
                    Reset My Password
                  </button>
                  <Link to={ROUTES.SIGN_IN} className="btn btn-primary ml-2">
                    Cancel
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
        <br />

        <div className="col-md-6">
          {error && (
            <div className="alert alert-danger alert-dismissible" role="alert">
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
              <strong>{error.message}</strong>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

const PasswordForgetLink = () => (
  <p className="mt-4 text-center">
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForget;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
