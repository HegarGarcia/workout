import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import React, { useCallback, useEffect, useReducer } from 'react';
import RunningImg from '../assets/running.jpeg';
import PasswordInput from '../components/PasswordInput';
import useAuth from '../hook/auth';
import useLayout from '../hook/layout';
import CenterWrapper from '../styles/CenterWrapper';

const initialState = {
  name: '',
  gender: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'change':
      return { ...state, [action.field]: action.payload };
    default:
      return state;
  }
};

const Register = () => {
  const [user, dispatch] = useReducer(reducer, initialState);
  const { signUpWithEmailAndPassword } = useAuth();
  const { setAuthForm } = useLayout();

  useEffect(() => {
    setAuthForm({ bg: 'img', src: RunningImg, title: 'Register with Email' });
  }, [setAuthForm]);

  const register = useCallback(async () => {
    const { email, password, confirmPassword, name, gender } = user;

    if (password && password !== confirmPassword) {
      return;
    }

    await signUpWithEmailAndPassword({ email, password, name, gender });
  }, [signUpWithEmailAndPassword, user]);

  const onChange = useCallback(({ target }) => {
    dispatch({ type: 'change', field: target.name, payload: target.value });
  }, []);

  return (
    <CenterWrapper>
      <TextField
        fullWidth
        variant="filled"
        label="Name"
        name="name"
        onChange={onChange}
      />
      <FormControl variant="filled">
        <InputLabel id="gender">Gender</InputLabel>
        <Select
          labelId="gender"
          label="Gender"
          name="gender"
          fullWidth
          value={user.gender}
          onChange={onChange}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        variant="filled"
        label="Email"
        type="email"
        name="email"
        onChange={onChange}
      />
      <PasswordInput label="Password" name="password" onChange={onChange} />
      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        onChange={onChange}
      />
      <Button variant="contained" color="primary" fullWidth onClick={register}>
        REGISTER
      </Button>
    </CenterWrapper>
  );
};

export default Register;
