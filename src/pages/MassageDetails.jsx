import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMassage } from '../api/massage.api';
import {
  Typography,
  CardMedia,
  CardActions,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BookIcon from '@mui/icons-material/Book';
import StarIcon from '@mui/icons-material/Star';
import ReviewForm from '../components/ReviewForm';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    gap: theme.spacing(2)
  },
  media: {
    width: '50%',
    height: 300,
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1)
  },
  description: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    fontFamily: 'Georgia, serif'
  },
  detailsContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  actionButton: {
    marginTop: theme.spacing(2)
  },
  expansionPanel: {
    marginTop: theme.spacing(3),
    width: '100%'
  },
  expansionPanelSummary: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  starIcon: {
    color: theme.palette.primary.contrastText
  }
}));

const MassageDetails = () => {
  const classes = useStyles();
  const [massage, setMassage] = useState(null);
  const [openReviewForm, setOpenReviewForm] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchMassage = async id => {
    try {
      const response = await getMassage(id);
      setMassage(response.data);
    } catch (error) {
      console.log('Error fetching massage', error);
    }
  };

  useEffect(() => {
    fetchMassage(id);
  }, [id]);

  const handleOpenReviewForm = () => {
    setOpenReviewForm(true);
  };

  // Close the review form dialog
  const handleCloseReviewForm = () => {
    setOpenReviewForm(false);
  };

  const handleBookNow = () => {
    navigate('/account/book-massage');
  };

  const renderStars = rating => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={classes.starIcon}
          fontSize='small'
          color={i < rating ? 'primary' : 'disabled'}
        />
      );
    }
    return stars;
  };

  return (
    <div className={classes.root}>
      {massage ? (
        <>
          <CardMedia
            className={classes.media}
            image={massage.image}
            title={massage.title}
          />
          <Typography variant='h5' component='h2'>
            {massage.title}
          </Typography>
          <Typography
            variant='body1'
            component='p'
            className={classes.description}
          >
            {massage.description}
          </Typography>
          <div className={classes.detailsContainer}>
            <Typography variant='body2'>
              <AccessTimeIcon fontSize='small' /> {massage.duration} minutes
            </Typography>
            <Typography variant='body2'>
              <AttachMoneyIcon fontSize='small' /> {massage.price} USD
            </Typography>
          </div>
          <CardActions>
            <Button
              variant='contained'
              color='primary'
              className={classes.actionButton}
              startIcon={<BookIcon />}
              onClick={handleBookNow}
            >
              Book now this massage
            </Button>
            <Button
              variant='contained'
              color='secondary'
              className={classes.actionButton}
              startIcon={<StarIcon />}
              onClick={handleOpenReviewForm}
            >
              Review
            </Button>
          </CardActions>
          <ReviewForm
            open={openReviewForm}
            onClose={handleCloseReviewForm}
            refreshMassage={fetchMassage}
            massageId={id}
          />
          <Accordion className={classes.expansionPanel}>
            <AccordionSummary
              expandIcon={<StarIcon />}
              className={classes.expansionPanelSummary}
            >
              <div className={classes.ratingContainer}>
                <Typography variant='body2'>
                  Average Rating: {renderStars(massage.averageRating)}
                </Typography>
                <Typography variant='body2'>
                  ({massage.totalReviews} reviews)
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {massage.reviews.map(review => (
                  <div key={review._id}>
                    <Typography variant='body2'>
                      {review.user.firstName}
                    </Typography>
                    <Typography variant='body1'>{review.reviewText}</Typography>
                    <div className={classes.ratingContainer}>
                      <Typography variant='body2'>
                        Rating: {renderStars(review.rating)}
                      </Typography>
                      <Typography variant='body2'>
                        {new Date(review.createdAt).toLocaleDateString(
                          'pt-PT',
                          {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric'
                          }
                        )}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </>
      ) : (
        <Typography variant='body1'>Loading...</Typography>
      )}
    </div>
  );
};

export default MassageDetails;
