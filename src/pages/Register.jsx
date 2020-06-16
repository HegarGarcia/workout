import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import React, { useCallback, memo } from 'react';
import styled from 'styled-components';
import RunningImg from '../assets/running.jpeg';
import PasswordInput from '../components/PasswordInput';
import useForm from '../hook/form';
import { signUpWithEmailAndPassword } from '../service/auth';
import CenterWrapper from '../styles/CenterWrapper';
import withAuthFormLayout from '../hoc/withAuthFormLayout';

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const Register = memo(() => {
  const { values, onChange } = useForm({
    name: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const submit = useCallback(
    async (event) => {
      event.preventDefault();
      event.persist();

      const { email, password, confirmPassword, name, gender } = values;

      if (!password || !confirmPassword || password !== confirmPassword) {
        return;
      }

      await signUpWithEmailAndPassword({ email, password, name, gender });
    },
    [values]
  );

  return (
    <Form onSubmit={submit}>
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
            value={values.gender}
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
        <Button variant="contained" color="primary" fullWidth type="submit">
          REGISTER
        </Button>
      </CenterWrapper>
    </Form>
  );
});

export default withAuthFormLayout({
  src: RunningImg,
  title: 'Register with Email'
})(Register);
