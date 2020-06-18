import React, { createContext, useEffect, useState } from 'react';
import { auth, firestore } from '../service/firebase';

function extractUser(user = {}) {
  return {
    uid: user.uid || '',
    name: user.name || user.displayName || '',
    photoURL: user.photoURL || '',
    gender: user.gender || '',
    email: user.email || ''
  };
}

function safeUserId() {
  let user = {};

  try {
    user = JSON.parse(localStorage.getItem('user')) || {};
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return extractUser(user);
}

const initialValues = safeUserId() || {};

export const UserContext = createContext({ user: initialValues });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialValues);

  useEffect(() => {
    auth.onAuthStateChanged(async (credentials) => {
      if (credentials) {
        const doc = await firestore.doc(`user/${credentials.uid}`).get();
        const userData = doc.exists ? doc.data() : credentials;
        setUser(extractUser(userData));
        localStorage.setItem('user', JSON.stringify({ uid: credentials.uid }));
      } else {
        setUser(extractUser());
        localStorage.removeItem('user');
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
