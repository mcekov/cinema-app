import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import AboutPage from '../About';
import { SingleFilmPage } from '../Films';
import { UserItem } from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <Fragment>
      {/* Navigation comp. uses the new context to consume the authenticated user */}
      <Navigation />
      <div className="container">
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />

          <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route exact path={ROUTES.ABOUT} component={AboutPage} />
          <Route
            exact
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route exact path={ROUTES.ADMIN} component={AdminPage} />
          <Route
            exact
            path={`${ROUTES.FILM_VIEW}/:id`}
            component={SingleFilmPage}
          />
          <Route
            exact
            to={`${ROUTES.ADMIN_DETAILS}/:id`}
            component={UserItem}
          />
        </Switch>
      </div>
    </Fragment>
  </Router>
);

export default withAuthentication(App);
