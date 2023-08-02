import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Rating
} from '@mui/material';
import { addReview } from '../api/massage.api';
import StarIcon from '@mui/icons-material/Star';

const ReviewForm = ({ massageId, refreshMassage, open, onClose }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleReviewTextChange = event => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const newReview = {
        rating,
        reviewText,
        massageId
      };

      await addReview(newReview);

      setRating(0);
      setReviewText('');
      refreshMassage(massageId);
    } catch (error) {
      console.log('Error adding review', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Write a Review</DialogTitle>
      <DialogContent>
        <Typography variant='body2'>Rating:</Typography>
        <Rating
          name='rating'
          value={rating}
          onChange={handleRatingChange}
          icon={<StarIcon fontSize='small' />}
        />
        <Typography variant='body2'>Review:</Typography>
        <TextField
          multiline
          rows={4}
          variant='outlined'
          fullWidth
          value={reviewText}
          onChange={handleReviewTextChange}
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

export default ReviewForm;
