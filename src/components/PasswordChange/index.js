import React, { Component, Fragment } from 'react';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();

    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword">Password</label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
            />
          </div>
          <button
            className="btn btn-primary"
            disabled={isInvalid}
            type="submit"
          >
            Change My Password
          </button>
        </form>
        <br />
        {error && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            <button type="button" className="close" data-dismiss="alert">
              &times;
            </button>
            <strong>{error.message}</strong>
          </div>
        )}
      </Fragment>
    );
  }
}

export default withFirebase(PasswordChangeForm);
