import { useContext } from 'react';
import { AuthContext } from '../context/auth';

const useAuth = () => useContext(AuthContext);

export default useAuth;
