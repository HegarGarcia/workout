import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useCallback, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import StrechingImg from '../assets/streching.jpg';
import GoogleButton from '../components/GoogleButton';
import PasswordInput from '../components/PasswordInput';
import useAuth from '../hook/auth';
import useLayout from '../hook/layout';
import CenterWrapper from '../styles/CenterWrapper';

const reducer = (state, action) => {
  switch (action.type) {
    case 'change':
      return { ...state, [action.field]: action.payload };
    default:
      return state;
  }
};

const LogIn = () => {
  const [credentials, dispatch] = useReducer(reducer, {
    email: '',
    password: ''
  });
  const { setAuth } = useLayout();
  const { loginWithEmailAndPassword, loginWithGoogle } = useAuth();

  useEffect(() => {
    setAuth({ bg: 'img', src: StrechingImg });
  }, [setAuth]);

  const signin = useCallback(async () => {
    await loginWithEmailAndPassword({
      email: credentials.email,
      password: credentials.password
    });
  }, [credentials.email, credentials.password, loginWithEmailAndPassword]);

  const onChange = useCallback(({ target }) => {
    dispatch({ type: 'change', field: target.name, payload: target.value });
  }, []);

  return (
    <CenterWrapper>
      <TextField
        fullWidth
        variant="filled"
        label="Email"
        type="email"
        color="primary"
        name="email"
        onChange={onChange}
      />
      <PasswordInput label="Password" onChange={onChange} name="password" />
      <Button onClick={signin} variant="contained" color="primary" fullWidth>
        Log In
      </Button>
      <GoogleButton onClick={loginWithGoogle} />
      <Button to="/signup" component={Link} fullWidth>
        Sign Up
      </Button>
      <Button to="/forgotpassword" component={Link} fullWidth>
        Forgot Password
      </Button>
    </CenterWrapper>
  );
};

export default LogIn;
