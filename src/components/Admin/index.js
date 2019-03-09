import React, { Component, Fragment } from 'react';

import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import AddFilmBase from '../AddFilms';

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
        <div className="row justify-content-center">
          <div className="col-sm-5">
            <h1>Admin Page</h1>
            <p>The Admin Page is accessible by every signed in ADMIN user.</p>
          </div>
          {loading && <div>Loading ...</div>}
        </div>

        <div className="row">
          <div className="col-sm-4">
            {users ? (
              <UserList users={users} />
            ) : (
              <div>There are no users in db!</div>
            )}
          </div>

          <div className="col-sm-4">
            <AddFilmBase />
          </div>
        </div>
      </Fragment>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
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
      </li>
    ))}
  </ul>
);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withAuthorization(condition),
  withFirebase
)(AdminPage);
