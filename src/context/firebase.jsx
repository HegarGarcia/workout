import React, { createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import config from '../constants/firebase';

const app = firebase.initializeApp(config);

export const FirebaseContext = createContext({
  firestore: app.firestore(),
  auth: app.auth()
});

const FirebaseProvider = ({ children }) => (
  <FirebaseContext.Provider
    value={{
      firestore: app.firestore(),
      auth: app.auth()
    }}
  >
    {children}
  </FirebaseContext.Provider>
);

export default FirebaseProvider;
