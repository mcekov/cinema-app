import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOut from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
    <div className="container">
      <Link className="navbar-brand" to={ROUTES.LANDING}>
        Cine Utopia
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              <NavigationAuth authUser={authUser} />
            ) : (
              <NavigationNonAuth />
            )
          }
        </AuthUserContext.Consumer>
      </div>
    </div>
  </nav>
);

const NavigationAuth = ({ authUser }) => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to={ROUTES.LANDING}>
        Landing
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to={ROUTES.HOME}>
        Home
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to={ROUTES.ACCOUNT}>
        Account
      </Link>
    </li>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <li className="nav-item">
        <Link className="nav-link" to={ROUTES.ADMIN}>
          Admin
        </Link>
      </li>
    )}
    <li className="nav-item">
      <SignOut />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to={ROUTES.LANDING}>
        Landing
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to={ROUTES.SIGN_IN}>
        Sign In
      </Link>
    </li>
  </ul>
);

export default Navigation;
