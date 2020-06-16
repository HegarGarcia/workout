import { firestore } from './firebase';

const userCollection = firestore.collection('user');

export async function getUserProfile(uid) {
  const doc = await userCollection.doc(uid).get();
  return doc.data();
}

export async function registerUser({ uid, name, email, gender, photoURL }) {
  await userCollection.doc(uid).set({ name, email, gender, photoURL });
}
