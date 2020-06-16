import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StrechingImg from '../assets/streching.jpg';
import GoogleButton from '../components/GoogleButton';
import PasswordInput from '../components/PasswordInput';
import CenterWrapper from '../styles/CenterWrapper';
import { loginWithEmailAndPassword, loginWithGoogle } from '../service/auth';
import useForm from '../hook/form';
import withAuthLayout from '../hoc/withAuthLayout';

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-content: center;
`;

const LogIn = () => {
  const { values, onChange } = useForm({
    email: '',
    password: ''
  });

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      event.persist();

      await loginWithEmailAndPassword({
        email: values.email,
        password: values.password
      });
    },
    [values]
  );

  return (
    <CenterWrapper>
      <Form onSubmit={onSubmit}>
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
        <Button variant="contained" color="primary" fullWidth type="submit">
          Log In
        </Button>
      </Form>
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

export default withAuthLayout({ src: StrechingImg })(LogIn);
