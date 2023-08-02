import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.api';
import { upload } from '../api/massage.api';
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
  FormHelperText,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Avatar,
  Input,
  Box
} from '@mui/material';
import { Visibility, VisibilityOff, PhotoCamera } from '@mui/icons-material';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState();
  const [allergies, setAllergies] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleFirstName = e => {
    setFirstName(e.target.value);
  };

  const handleLastName = e => {
    setLastName(e.target.value);
  };

  const handleBirthday = e => {
    setBirthday(e.target.value);
  };

  const handlePhone = e => {
    setPhone(e.target.value);
  };

  const handleGender = e => {
    setGender(e.target.value);
  };

  const handlePhoto = e => {
    const selectedFile = e.target.files[0];
    console.log('Selected file:', selectedFile);
    setPhoto(selectedFile);
  };

  const handleAllergies = e => {
    setAllergies(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const user = {
        email,
        password,
        firstName,
        lastName,
        birthday,
        phone,
        gender,
        allergies
      };

      if (photo) {
        const uploadData = new FormData();
        uploadData.append('file', photo);
        const response = await upload(uploadData);
        user.photo = response.data.fileUrl;
      }

      await signup(user);
      navigate('/');
    } catch (error) {
      console.log('Error signing up', error);
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <Container maxWidth='xs'>
      <Typography variant='h5' align='center' gutterBottom>
        Sign Up
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
                  onClick={() =>
                    setShowPassword(prevShowPassword => !prevShowPassword)
                  }
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
        <TextField
          label='First Name'
          variant='outlined'
          fullWidth
          margin='normal'
          value={firstName}
          onChange={handleFirstName}
        />
        <TextField
          label='Last Name'
          variant='outlined'
          fullWidth
          margin='normal'
          value={lastName}
          onChange={handleLastName}
        />
        <TextField
          type='date'
          label='Birthday'
          variant='outlined'
          fullWidth
          margin='normal'
          value={birthday}
          onChange={handleBirthday}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          label='Phone'
          variant='outlined'
          fullWidth
          margin='normal'
          value={phone}
          onChange={handlePhone}
        />
        <FormControl component='fieldset' fullWidth margin='normal'>
          <FormLabel component='legend'>Gender</FormLabel>
          <RadioGroup row value={gender} onChange={handleGender}>
            <FormControlLabel value='male' control={<Radio />} label='Male' />
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Female'
            />
            <FormControlLabel value='other' control={<Radio />} label='Other' />
          </RadioGroup>
        </FormControl>
        <input
          accept='image/*'
          style={{ display: 'none' }}
          id='photo-upload'
          type='file'
          onChange={handlePhoto}
        />
        <label htmlFor='photo-upload'>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            mt={2}
            mb={3}
          >
            <Avatar
              src={photo ? URL.createObjectURL(photo) : undefined}
              sx={{ width: 100, height: 100 }}
            />
            <IconButton component='span' size='small'>
              <PhotoCamera />
            </IconButton>
            <Typography variant='body2'>Upload Photo</Typography>
          </Box>
        </label>
        <TextField
          label='Allergies'
          variant='outlined'
          fullWidth
          margin='normal'
          value={allergies}
          onChange={handleAllergies}
          multiline
          rows={3}
        />
        <Button type='submit' variant='contained' fullWidth sx={{ mt: 3 }}>
          Sign Up
        </Button>
      </form>
      <Typography variant='body2' align='center' mt={2}>
        Already have an account?{' '}
        <Link component={RouterLink} to='/login'>
          Log In
        </Link>
      </Typography>
    </Container>
  );
};

export default Signup;
