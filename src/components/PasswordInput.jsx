import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useCallback, useState } from 'react';

const PasswordInput = ({
  label,
  value,
  onChange,
  fullWidth = true,
  variant = 'filled'
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = useCallback(() => setShowPassword(!showPassword), [
    showPassword
  ]);

  const Adornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={toggleVisibility}
      >
        {!showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <FormControl fullWidth={fullWidth} variant={variant} color="primary">
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <FilledInput
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        endAdornment={Adornment}
      />
    </FormControl>
  );
};

export default PasswordInput;
