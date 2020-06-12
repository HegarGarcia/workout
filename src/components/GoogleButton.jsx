import { Button } from '@material-ui/core';
import React from 'react';
import GoogleIcon from '../assets/google.svg';

const GoogleButton = ({ type = 'signin', onClick }) => (
  <Button
    onClick={onClick}
    variant="contained"
    startIcon={<img src={GoogleIcon} alt="google logo" />}
    fullWidth
  >
    {type === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}
  </Button>
);

export default GoogleButton;
