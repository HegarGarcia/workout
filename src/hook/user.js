import { useContext } from 'react';
import { UserContext } from '../context/user';

const useUser = () => useContext(UserContext);

export default useUser;
