import firebase, { auth, user } from 'firebase/app';
import {
  loginWithEmailAndPassword,
  signOut,
  resetPassword,
  loginWithGoogle,
  signUpWithEmailAndPassword
} from '../auth';

describe('Auth service', () => {
  it('Should initialize Google Provider', () => {
    expect(firebase.auth.GoogleAuthProvider).toHaveBeenCalled();
  });

  describe('Login with email and password', () => {
    beforeEach(() => {
      jest.spyOn(Storage.prototype, 'setItem');
      jest.clearAllMocks();
    });

    it('Should login with email and password', () => {
      const args = { email: 'email@x.com', password: 'password' };
      loginWithEmailAndPassword(args);

      expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        args.email,
        args.password
      );
    });

    it('Should throw if invalid email', async () => {
      await expect(
        loginWithEmailAndPassword({ email: 'email', password: 'password' })
      ).rejects.toThrow('Invalid email');
    });

    it('Should throw if user disabled', async () => {
      await expect(
        loginWithEmailAndPassword({
          email: 'disabled@x.com',
          password: 'password'
        })
      ).rejects.toThrow('User disabled');
    });

    it('Should throw if user not found', async () => {
      await expect(
        loginWithEmailAndPassword({
          email: 'notfound@x.com',
          password: 'password'
        })
      ).rejects.toThrow('User not found');
    });

    it('Should throw if wrong password', async () => {
      await expect(
        loginWithEmailAndPassword({ email: 'email', password: '' })
      ).rejects.toThrow('Wrong password');
    });

    it('Should cache uid to localStorage', async () => {
      await loginWithEmailAndPassword({
        email: 'email@x.com',
        password: 'password'
      });

      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify({ uid: user.uid })
      );
    });
  });

  describe('Login with Google', () => {
    beforeEach(() => {
      jest.spyOn(Storage.prototype, 'setItem');
      jest.clearAllMocks();
    });

    it('Should login with Google Provider', async () => {
      await loginWithGoogle();

      expect(auth.signInWithPopup).toHaveBeenCalled();
    });

    it('Should cache uid to localStorage', async () => {
      await loginWithGoogle();

      expect(localStorage.setItem).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify({ uid: user.uid })
      );
    });
  });

  describe('Sign up with email and password', () => {
    beforeEach(() => {
      jest.spyOn(Storage.prototype, 'setItem');
    });

    it('Should create user with email and password', async () => {
      const credentials = {
        email: 'email@x.com',
        password: '123'
      };
      await signUpWithEmailAndPassword(credentials);

      expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
        credentials.email,
        credentials.password
      );
    });

    it('Should throw if invalid email', async () => {
      const credentials = {
        email: 'invalid@x.com',
        password: '123'
      };

      await expect(signUpWithEmailAndPassword(credentials)).rejects.toThrow(
        'Invalid email'
      );
    });

    it('Should throw if email in use', async () => {
      const credentials = {
        email: 'inuse@x.com',
        password: '123'
      };

      await expect(signUpWithEmailAndPassword(credentials)).rejects.toThrow(
        'Email already in use'
      );
    });

    it('Should throw if server issue', async () => {
      const credentials = {
        email: 'server@x.com',
        password: '123'
      };

      await expect(signUpWithEmailAndPassword(credentials)).rejects.toThrow(
        'Server issue'
      );
    });

    it('Should throw if weak password', async () => {
      const credentials = { email: 'email@x.com', password: '' };

      await expect(signUpWithEmailAndPassword(credentials)).rejects.toThrow(
        'Weak password'
      );
    });

    it('Should cache uid to localStorage', async () => {});
  });

  describe('Sign out', () => {
    beforeEach(() => {
      jest.spyOn(Storage.prototype, 'removeItem');
    });

    it('Shoudl sign out user', () => {
      signOut();
      expect(auth.signOut).toHaveBeenCalled();
    });

    it('Should remove cache uid', () => {
      signOut();
      expect(auth.signOut).toHaveBeenCalled();
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    });
  });

  describe('Reset password', () => {
    it('Should reset user password', () => {
      const email = 'email@x.com';
      resetPassword(email);
      expect(auth.sendPasswordResetEmail).toHaveBeenCalledWith(email);
    });
  });
});
