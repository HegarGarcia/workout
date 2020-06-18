export const user = { uid: '1' };

const emailRegex = /\S+@\S+\.\S+/;

class AuthError extends Error {
  constructor(code) {
    super();
    this.code = code;
  }
}

export const auth = {
  signInWithEmailAndPassword: jest.fn((email, passowrd) => {
    if (email === 'disabled@x.com') {
      return Promise.reject(new AuthError('auth/user-disabled'));
    }

    if (email === 'notfound@x.com') {
      return Promise.reject(new AuthError('auth/user-not-found'));
    }

    if (passowrd === '') {
      return Promise.reject(new AuthError('auth/wrong-password'));
    }

    if (emailRegex.test(email)) {
      return Promise.resolve({ user });
    }

    return Promise.reject(new AuthError('auth/invalid-email'));
  }),
  signInWithPopup: jest.fn(() => ({ user })),
  createUserWithEmailAndPassword: jest.fn((email, password) => {
    if (email === 'inuse@x.com') {
      return Promise.reject(new AuthError('auth/email-already-in-use'));
    }

    if (email === 'invalid@x.com') {
      return Promise.reject(new AuthError('auth/invalid-email'));
    }

    if (email === 'server@x.com') {
      return Promise.reject(new AuthError('auth/operation-not-allowed'));
    }

    if (password === '') {
      return Promise.reject(new AuthError('auth/weak-password'));
    }

    return Promise.resolve({ user });
  }),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  onAuthStateChanged: jest.fn()
};

export const app = {
  firestore: jest.fn(),
  auth: jest.fn(() => auth)
};

export default {
  initializeApp: jest.fn(() => app),
  auth: {
    GoogleAuthProvider: jest.fn()
  }
};
