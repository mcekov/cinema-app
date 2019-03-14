import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import AddFilmForm from '../Films';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      if (usersObject) {
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key
        }));

        this.setState({
          users: usersList,
          loading: false
        });
      } else {
        this.setState({
          users: null,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <Fragment>
        <div className="row justify-content-center mb-5">
          <div className="col-sm-5">
            <h1>Admin Page</h1>
            <p>The Admin Page is accessible by every signed in ADMIN user.</p>
          </div>
          {loading && <div>Loading ...</div>}
        </div>

        <div className="row">
          <div className="col-sm-4">
            {users ? (
              <Fragment>
                <CountRegisteredUsers users={users.length} />
                <UserList users={users} />
              </Fragment>
            ) : (
              <div>There are no users in db!</div>
            )}
          </div>

          <div className="col-md-6 m-auto">
            <div className="card">
              <h5 className="card-header">Add New Film</h5>
              <div className="card-body">
                <AddFilmForm />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

class UserListBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .users()
      .limitToLast(3)
      .on('value', snapshot => {
        const usersObject = snapshot.val();

        if (usersObject) {
          const userList = Object.keys(usersObject).map(key => ({
            ...usersObject[key],
            uid: key
          }));

          this.setState({ users: userList, loading: false });
        } else {
          this.setState({
            loading: false,
            users: null
          });
        }
      });
  }
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        {loading && <div>Loading ...</div>}
        <h4 className="mt-3">Last 3 registered users:</h4>
        <ul className="list-group mt-3">
          {users.map(user => (
            <li className="list-group-item" key={user.uid}>
              <span>
                <strong>ID:</strong> {user.uid}
              </span>
              <br />
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span>
              <br />
              <span>
                <strong>Username:</strong> {user.username}
              </span>
              <br />
              <span>
                <Link
                  to={{
                    pathname: `${ROUTES.ADMIN_DETAILS}/${user.uid}`,
                    state: { user }
                  }}
                >
                  Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class UserItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: null,
      success: null,
      user: null,
      ...props.location.state
    };
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({ user: snapshot.val(), loading: false });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase
      .doPasswordReset(this.state.user.email)
      .then(() => {
        this.setState({
          success: `Password reset email sended to ${this.state.user.email}`
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { user, loading, error, success } = this.state;

    return (
      <Fragment>
        {loading && <div>Loading...</div>}

        {user && (
          <div className="row mt-2">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <span>
                    <strong>ID: </strong>
                    {user.uid}
                    <br />
                    <strong>Email: </strong>
                    {user.email}
                    <br />
                    <strong>Username: </strong>
                    {user.username}
                  </span>
                  <br />
                  <span>
                    <button
                      className="btn btn-sm btn-danger mt-3"
                      type="button"
                      onClick={this.onSendPasswordResetEmail}
                    >
                      Send Password Reset
                    </button>
                    <br />
                    <Link
                      to={ROUTES.ADMIN}
                      className="btn btn-sm btn-primary mt-3"
                    >
                      Back
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row mt-2">
          <div className="col-md-6">
            {success && (
              <div
                className="alert alert-danger alert-dismissible"
                role="alert"
              >
                <button type="button" className="close" data-dismiss="alert">
                  &times;
                </button>
                <strong>{success}</strong>
              </div>
            )}
          </div>

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

const CountRegisteredUsers = ({ users }) => (
  <div className="card">
    <div className="list-group-item list-group-item-success">
      Registered users: {users}
    </div>
  </div>
);

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export { UserItem };
export default compose(
  withAuthorization(condition),
  withFirebase
)(AdminPage);
