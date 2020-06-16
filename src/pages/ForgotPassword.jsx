import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Link } from 'react-router-dom';
import RunningImg from '../assets/streching.jpg';
import CenterWrapper from '../styles/CenterWrapper';
import withAuthFormLayout from '../hoc/withAuthFormLayout';

const ForgotPassword = () => (
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

export default withAuthFormLayout({
  src: RunningImg,
  title: 'Forgot Password'
})(ForgotPassword);
