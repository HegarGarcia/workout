import firebase, { app } from 'firebase/app';
import '../firebase';

describe('Firebase', () => {
  it('Should initialize firebase', () => {
    expect(firebase.initializeApp).toHaveBeenCalled();
  });

  it('Should initialize firestore', () => {
    expect(app.firestore).toHaveBeenCalled();
  });

  it('Should initialize auth', () => {
    expect(app.auth).toHaveBeenCalled();
  });
});
