import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMassage, updateMassage } from '../api/massage.api';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

const MassageEdit = () => {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(null);
  const [price, setPrice] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMassage = async () => {
      try {
        const response = await getMassage(id);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setPrice(response.data.price);
      } catch (error) {
        console.log('Error fetching massage', error);
      }
    };

    fetchMassage();
  }, [id]);

  const handleTitle = e => {
    setTitle(e.target.value);
  };

  const handleDescription = e => {
    setDescription(e.target.value);
  };

  const handleDuration = e => {
    setDuration(e.target.value);
  };

  const handlePrice = e => {
    setPrice(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const updatedMassage = { title, description, duration, price, _id: id };
      await updateMassage(updatedMassage);
      navigate('/massages');
    } catch (error) {}
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label='Title'
        name='title'
        value={title}
        onChange={handleTitle}
        required
      />
      <TextField
        label='Description'
        name='description'
        value={description}
        onChange={handleDescription}
        required
      />
      <TextField
        label='Duration (minutes)'
        name='duration'
        type='number'
        value={duration === null ? '' : duration}
        onChange={handleDuration}
        required
      />
      <TextField
        label='Price'
        name='price'
        type='number'
        value={price === null ? '' : price}
        onChange={handlePrice}
        required
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        className={classes.submitButton}
      >
        Update Massage
      </Button>
    </form>
  );
};

export default MassageEdit;
