import firebase from 'firebase';
import { auth } from './firebase';

class AuthError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

const GoogleProvider = new firebase.auth.GoogleAuthProvider();

export async function loginWithEmailAndPassword({ email, password }) {
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
        throw new AuthError(error.message);
    }
  }
}

export async function loginWithGoogle() {
  try {
    await auth.signInWithPopup(GoogleProvider);
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
        throw new AuthError(error.message);
    }
  }
}

export async function signUpWithEmailAndPassword({ email, password }) {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
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
        throw new AuthError(error.message);
    }
  }
}

export async function signOut() {
  await auth.signOut();
}
