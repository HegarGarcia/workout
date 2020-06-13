import { useContext } from 'react';
import { FirebaseContext } from '../context/firebase';

const useFirebase = () => useContext(FirebaseContext);

export default useFirebase;
