import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RunningImg from '../assets/streching.jpg';
import { LayoutContext } from '../context/layout';
import CenterWrapper from '../styles/CenterWrapper';

const ForgotPassword = () => {
  const { setAuthForm } = useContext(LayoutContext);

  useEffect(() => {
    setAuthForm({ bg: 'img', src: RunningImg, title: 'Forgot Password' });
  }, [setAuthForm]);

  return (
    <CenterWrapper>
      <TextField
        fullWidth
        variant="filled"
        label="Email"
        type="email"
        color="primary"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        component={Link}
        to="/login"
      >
        Recover Password
      </Button>
    </CenterWrapper>
  );
};

export default ForgotPassword;
