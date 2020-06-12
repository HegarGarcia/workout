import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RunningImg from '../assets/running.jpeg';
import PasswordInput from '../components/PasswordInput';
import { AuthContext } from '../context/auth';
import { LayoutContext } from '../context/layout';
import CenterWrapper from '../styles/CenterWrapper';

const Register = () => {
  const history = useHistory();
  const { login } = useContext(AuthContext);
  const { setAuthForm } = useContext(LayoutContext);

  useEffect(() => {
    setAuthForm({ bg: 'img', src: RunningImg, title: 'Register with Email' });
  }, [setAuthForm]);

  const register = useCallback(() => {
    login();
    history.push('/');
  }, [login, history]);
  const [gender, setGender] = useState('');
  const selectGender = useCallback(
    (event) => setGender(event.target.value),
    []
  );

  return (
    <CenterWrapper>
      <TextField fullWidth variant="filled" label="Name" />
      <FormControl variant="filled">
        <InputLabel id="gender">Gender</InputLabel>
        <Select
          labelId="gender"
          label="Gender"
          fullWidth
          value={gender}
          onChange={selectGender}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField fullWidth variant="filled" label="Email" type="email" />
      <PasswordInput label="Password" />
      <PasswordInput label="Confirm Password" />
      <Button variant="contained" color="primary" fullWidth onClick={register}>
        REGISTER
      </Button>
    </CenterWrapper>
  );
};

export default Register;
