import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { login } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const user = { email, password };
      const response = await login(user);

      if (response.data && response.data.authToken) {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      }
    } catch (error) {
      console.log('Error login in', error);
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <Container maxWidth='xs'>
      <Typography variant='h5' align='center' gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type='email'
          label='Email'
          variant='outlined'
          fullWidth
          margin='normal'
          value={email}
          onChange={handleEmail}
        />
        <FormControl fullWidth variant='outlined' margin='normal'>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <OutlinedInput
            id='password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePassword}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleShowPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
          <FormHelperText error>{errorMessage}</FormHelperText>
        </FormControl>
        <Button type='submit' variant='contained' fullWidth sx={{ mt: 3 }}>
          Login
        </Button>
      </form>
      <Typography variant='body2' align='center' mt={2}>
        Don't have an account?{' '}
        <Link component={RouterLink} to='/register'>
          Register
        </Link>
      </Typography>
    </Container>
  );
}
