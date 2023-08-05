import { useState } from 'react';
import { TextField, Button, Box, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { addMassage, upload } from '../api/massage.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PhotoCamera } from '@mui/icons-material';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: '300px',
    margin: 'auto',
    marginTop: theme.spacing(3)
  },
  submitButton: {
    marginTop: theme.spacing(2)
  }
}));

const AddMassage = () => {
  const classes = useStyles();
  const [image, setImage] = useState();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 0,
    price: 0
  });

  const navigate = useNavigate();

  const handleImage = e => {
    setImage(e.target.files[0]);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const parsedValue =
      name === 'duration' || name === 'price' ? parseInt(value) : value;
    setFormData(prevFormData => ({ ...prevFormData, [name]: parsedValue }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    console.log('Massage data:', formData);

    try {
      const newMassage = { ...formData };

      if (image) {
        const uploadData = new FormData();
        uploadData.append('file', image);
        const response = await upload(uploadData);

        newMassage.image = response.data.fileUrl;
      }

      await addMassage(newMassage);
      navigate('/massages');
    } catch (error) {
      toast.error('Something went wrong, try again later.');
      console.log('Error adding massage', error);
    }

    setFormData({
      title: '',
      description: '',
      duration: 0,
      price: 0
    });
    setImage();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label='Title'
        name='title'
        value={formData.title}
        onChange={handleChange}
        required
      />
      <TextField
        label='Description'
        name='description'
        value={formData.description}
        onChange={handleChange}
        required
      />
      <TextField
        label='Duration (minutes)'
        name='duration'
        type='number'
        value={formData.duration}
        onChange={handleChange}
        required
      />
      <TextField
        label='Price'
        name='price'
        type='number'
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        accept='image/*'
        style={{ display: 'none' }}
        id='photo-upload'
        type='file'
        onChange={handleImage}
      />
      <label htmlFor='photo-upload'>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          mt={2}
          mb={3}
        >
          <IconButton component='span' size='small'>
            <PhotoCamera />
          </IconButton>
          <Typography variant='body2'>Upload Image</Typography>
        </Box>
      </label>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        className={classes.submitButton}
      >
        Add New Massage
      </Button>
    </form>
  );
};

export default AddMassage;
