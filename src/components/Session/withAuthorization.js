import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

// Taking Component as input and returning it as output
const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    // Authorization logic. Using Firebase listener to trigger a callback func every time the authenticated user changes.
    // Authenticated user is either authUser object or null.
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          // Redirecting to sign in page.
          this.props.history.push(ROUTES > ROUTES.SIGN_IN);
        }
      });
    }

    componentWillUnmount() {
      // Remove (firebase) listener()
      this.listener();
    }

    // Displayng passed Component here...
    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
};

export default withAuthorization;
