import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from '../constants/firebase';

const app = firebase.initializeApp(config);

export const firestore = app.firestore();
export const auth = app.auth();
