import app from 'firebase/app';
import 'firebase/auth';

const config = {
  /* apiKey: 'AIzaSyAKypE8TL247zbiua7Vzt3Jzbf8LIkCios',
  authDomain: 'auth-boilerplate-e139b.firebaseapp.com',
  databaseURL: 'https://auth-boilerplate-e139b.firebaseio.com',
  projectId: 'auth-boilerplate-e139b',
  storageBucket: 'auth-boilerplate-e139b.appspot.com',
  messagingSenderId: '546881724114' */

  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  // *** Auth Api ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
