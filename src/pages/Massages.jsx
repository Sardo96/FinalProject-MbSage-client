import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllMassages } from '../api/massage.api';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300,
    margin: theme.spacing(2)
  },
  media: {
    height: 200
  },
  actionButton: {
    justifyContent: 'center'
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  starIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1)
  }
}));

const Massages = () => {
  const classes = useStyles();
  const [massages, setMassages] = useState([]);

  const fetchMassages = async () => {
    try {
      const response = await getAllMassages();
      setMassages(response.data);
    } catch (error) {
      console.log('Error fetching the projects', error);
    }
  };

  useEffect(() => {
    fetchMassages();
  }, []);

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
    <div>
      {massages.map(massage => (
        <Card key={massage._id} className={classes.card}>
          <CardActionArea component={Link} to={`/massages/${massage._id}`}>
            <CardMedia
              className={classes.media}
              image={massage.image}
              title={massage.title}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {massage.title}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                <AccessTimeIcon fontSize='small' /> {massage.duration} minutes
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                <AttachMoneyIcon fontSize='small' /> {massage.price} USD
              </Typography>
              <div className={classes.ratingContainer}>
                {renderStars(massage.averageRating)}
                <Typography variant='body2' color='textSecondary' component='p'>
                  ({massage.totalRating} ratings)
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.actionButton}>
            <Button
              variant='contained'
              color='primary'
              component={Link}
              to={`/massage/${massage._id}`}
            >
              See more details
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Massages;
