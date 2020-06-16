import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import RunningImg from '../assets/running.jpeg';
import GoogleButton from '../components/GoogleButton';
import withAuthLayout from '../hoc/withAuthLayout';
import { loginWithGoogle } from '../service/auth';
import CenterWrapper from '../styles/CenterWrapper';

const SignUp = () => (
  <CenterWrapper>
    <Button
      component={Link}
      variant="contained"
      color="primary"
      to="register"
      fullWidth
    >
      Sign Up with Email
    </Button>
    <GoogleButton type="signup" onClick={loginWithGoogle} />
    <Button component={Link} to="login" fullWidth>
      Log In
    </Button>
  </CenterWrapper>
);

export default withAuthLayout({ src: RunningImg })(SignUp);
