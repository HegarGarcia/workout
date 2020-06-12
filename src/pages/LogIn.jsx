import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useCallback, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import StrechingImg from '../assets/streching.jpg';
import GoogleButton from '../components/GoogleButton';
import PasswordInput from '../components/PasswordInput';
import { AuthContext } from '../context/auth';
import { LayoutContext } from '../context/layout';
import CenterWrapper from '../styles/CenterWrapper';

const LogIn = () => {
  const history = useHistory();

  const { setAuth } = useContext(LayoutContext);
  const { login } = useContext(AuthContext);

  const signin = useCallback(() => {
    login();
    history.push('/');
  }, [login, history]);

  useEffect(() => {
    setAuth({ bg: 'img', src: StrechingImg });
  }, [setAuth]);

  return (
    <CenterWrapper>
      <TextField
        fullWidth
        variant="filled"
        label="Email"
        type="email"
        color="primary"
      />
      <PasswordInput label="Password" />
      <Button onClick={signin} variant="contained" color="primary" fullWidth>
        Log In
      </Button>
      <GoogleButton onClick={signin} />
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
