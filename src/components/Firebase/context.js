import React from 'react';

/* ===
createContex func create two component. The "FirebaseContext.Provider" is used to
 provide a Firebase instance once at the top-lvl
of React Component Tree; and the "FirebaseContext.Consumer" component is used to retrieve 
the Firebase instance if it is needed in the React component.
=== */
const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
