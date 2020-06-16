import { Button } from '@material-ui/core';
import React, { useCallback, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RunningImg from '../assets/running.jpeg';
import GoogleButton from '../components/GoogleButton';
import { LayoutContext } from '../context/layout';
import CenterWrapper from '../styles/CenterWrapper';

const SignUp = () => {
  const history = useHistory();
  const { setAuth } = useContext(LayoutContext);
  const signup = useCallback(() => {
    history.push('/');
  }, [history]);

  useEffect(() => {
    setAuth({ bg: 'img', src: RunningImg });
  }, [setAuth]);

  return (
    <CenterWrapper>
      <Button
        component={Link}
        variant="contained"
        color="primary"
        to="/register"
        fullWidth
      >
        Sign Up with Email
      </Button>
      <GoogleButton type="signup" onClick={signup} />
      <Button component={Link} to="login" fullWidth>
        Log In
      </Button>
    </CenterWrapper>
  );
};

export default SignUp;
