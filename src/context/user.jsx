import React, { createContext, useEffect, useState } from 'react';
import useFirebase from '../hook/firebase';

export const UserContext = createContext();

const getUser = ({
  name = '',
  gender = '',
  email = '',
  uid = '',
  photoURL = ''
} = {}) => ({
  name,
  gender,
  email,
  uid,
  photoURL
});

const UserProvider = ({ children }) => {
  const { auth, firestore } = useFirebase();
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    auth.onAuthStateChanged(async (credentials) => {
      if (credentials) {
        const doc = await firestore.doc(`user/${credentials.uid}`).get();
        const userData = doc.exists ? doc.data() : credentials;
        setUser(getUser(userData));
      } else {
        setUser(getUser());
      }
    });
  }, [auth, firestore]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
