import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOut from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
    <div className="container">
      <Link className="navbar-brand" to={ROUTES.LANDING}>
        Film Club
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
  <Fragment>
    <ul className="navbar-nav mx-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to={ROUTES.ADMIN}>
          Hello {authUser.username}
        </NavLink>
      </li>
    </ul>
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink exact className="nav-link" to={ROUTES.LANDING}>
          Landing
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={ROUTES.HOME}>
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={ROUTES.ACCOUNT}>
          Account
        </NavLink>
      </li>
      {authUser.roles.includes(ROLES.ADMIN) && (
        <li className="nav-item">
          <NavLink className="nav-link" to={ROUTES.ADMIN}>
            Admin
          </NavLink>
        </li>
      )}
      <li className="nav-item">
        <NavLink className="nav-link" to={ROUTES.ABOUT}>
          About Us
        </NavLink>
      </li>
      <li className="nav-item">
        <SignOut />
      </li>
    </ul>
  </Fragment>
);

const NavigationNonAuth = () => (
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <NavLink exact className="nav-link" to={ROUTES.LANDING}>
        Landing
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to={ROUTES.SIGN_IN}>
        Sign In
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to={ROUTES.ABOUT}>
        About Us
      </NavLink>
    </li>
  </ul>
);

export default Navigation;
