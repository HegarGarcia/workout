import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import RunningImg from '../assets/streching.jpg';
import CenterWrapper from '../styles/CenterWrapper';
import withAuthFormLayout from '../hoc/withAuthFormLayout';
import { resetPassword } from '../service/auth';

function ForgotPassword() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  const onChange = useCallback(
    ({ target }) => {
      setEmail(target.value);
    },
    [setEmail]
  );

  const onSubmit = useCallback(async () => {
    await resetPassword(email);
    history.goBack();
  }, [email, history]);

  return (
    <CenterWrapper>
      <TextField
        fullWidth
        variant="filled"
        label="Email"
        type="email"
        color="primary"
        value={email}
        onChange={onChange}
      />
      <Button variant="contained" color="primary" fullWidth onClick={onSubmit}>
        Recover Password
      </Button>
    </CenterWrapper>
  );
}

export default withAuthFormLayout({
  src: RunningImg,
  title: 'Forgot Password'
})(ForgotPassword);
