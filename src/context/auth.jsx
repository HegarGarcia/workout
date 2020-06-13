// eslint-disable-next-line object-curly-newline
import React, { createContext, useCallback, useState, useEffect } from 'react';
import firebase from 'firebase';
import useFirebase from '../hook/firebase';

class AuthError extends Error {
  constructor(messsage) {
    super();
    this.message = messsage;
  }
}

export const AuthContext = createContext({
  user: {},
  // eslint-disable-next-line no-unused-vars
  async loginWithEmailAndPassword({ email, password }) {
    return Promise.resolve();
  },
  async loginWithGoogle() {
    return Promise.resolve();
  },
  // eslint-disable-next-line no-unused-vars
  async signUpWithEmailAndPassword({ email, password }) {
    return Promise.resolve();
  },
  async signOut() {
    return Promise.resolve();
  }
});

const AuthProvider = ({ children }) => {
  const { auth } = useFirebase();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, [auth]);

  const signOut = useCallback(async () => {
    await auth.signOut();
  }, [auth]);

  const loginWithEmailAndPassword = useCallback(
    async ({ email, password }) => {
      try {
        await auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            throw new AuthError('Invalid email');
          case 'auth/user-disabled':
            throw new AuthError('User disabled');
          case 'auth/user-not-found':
            throw new AuthError('User not found');
          case 'auth/wrong-password':
            throw new AuthError('Wrong password');
          default:
            throw new AuthError('Unknown error');
        }
      }
    },
    [auth]
  );

  const loginWithGoogle = useCallback(async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          throw new AuthError('Account already exists');
        case 'auth/auth-domain-config-required':
          throw new AuthError('Server issue');
        case 'auth/cancelled-popup-request':
          return;
        case 'auth/operation-not-allowed':
          throw new AuthError('Server issue');
        case 'auth/operation-not-supported-in-this-environment':
          throw new AuthError('Server issue');
        case 'auth/popup-blocked':
          throw new AuthError('Popup blocked');
        case 'auth/popup-closed-by-user':
          throw new AuthError('Popup closed before sign in');
        case 'auth/unauthorized-domain':
          throw new AuthError('Server issue');
        default:
          throw new AuthError();
      }
    }
  }, [auth]);

  const signUpWithEmailAndPassword = useCallback(
    async ({ email, password }) => {
      try {
        const credentials = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        await credentials.user.sendEmailVerification();
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            throw new AuthError('Email already in use');
          case 'auth/invalid-email':
            throw new AuthError('Invalid email');
          case 'auth/operation-not-allowed':
            throw new AuthError('Server issue');
          case 'auth/weak-password':
            throw new AuthError('Weak password');
          default:
            throw new AuthError();
        }
      } finally {
        await signOut();
      }
    },
    [auth, signOut]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithEmailAndPassword,
        loginWithGoogle,
        signUpWithEmailAndPassword,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
