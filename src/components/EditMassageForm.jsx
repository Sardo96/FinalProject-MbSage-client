import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField
} from '@mui/material';
import { updateMassage } from '../api/massage.api';

const EditMassageForm = ({ massageId, refreshMassage, open, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleDurationChange = event => {
    setDuration(event.target.value);
  };

  const handlePriceChange = event => {
    setPrice(event.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const updatedMassage = {
        title,
        description,
        duration,
        price,
        _id: massageId
      };

      console.log('New Id:', updatedMassage._id);

      await updateMassage(updatedMassage);

      setTitle('');
      setDescription('');
      setDuration(0);
      setPrice(0);
      onClose();
      refreshMassage(massageId);
    } catch (error) {
      console.log('Error updating massage', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Massage</DialogTitle>
      <DialogContent>
        <Typography variant='body2'>Title:</Typography>
        <TextField
          name='title'
          type='text'
          value={title}
          onChange={handleTitleChange}
        />
        <Typography variant='body2'>Description:</Typography>
        <TextField
          name='description'
          type='text'
          value={description}
          onChange={handleDescriptionChange}
        />
        <Typography variant='body2'>Duration (min):</Typography>
        <TextField
          name='duration'
          type='number'
          value={duration}
          onChange={handleDurationChange}
        />
        <Typography variant='body2'>Price (EUR):</Typography>
        <TextField
          name='price'
          type='number'
          value={price}
          onChange={handlePriceChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMassageForm;
