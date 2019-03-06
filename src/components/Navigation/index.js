import React from 'react';
import { Link } from 'react-router-dom';

import SignOut from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
    <div className="container">
      <Link className="navbar-brand" to={ROUTES.HOME}>
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
          {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
        </AuthUserContext.Consumer>

        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-primary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
);

const NavigationAuth = () => (
  <ul className="navbar-nav mr-auto">
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
    <li className="nav-item">
      <SignOut />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul className="navbar-nav mr-auto">
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

/* const NavigationNonAuth = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
    <div className="container">
      <a className="navbar-brand" href="#">
        Name
      </a>
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
        <ul className="navbar-nav mr-auto">
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
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-primary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
); */

export default Navigation;
