import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { addMassage, upload } from '../api/massage.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
    duration: null,
    price: null
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
      toast.success('Massage added successfully!');
      navigate('/massages');
    } catch (error) {
      toast.error('Something went wrong, try again later.');
      console.log('Error adding massage', error);
    }

    setFormData({
      title: '',
      description: '',
      duration: null,
      price: null
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
      <TextField
        label='Image URL'
        name='image'
        value={formData.image}
        onChange={handleChange}
      />
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
