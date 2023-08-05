import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllMassages } from '../api/massage.api';
import { AuthContext } from '../context/auth.context';
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
import EuroIcon from '@mui/icons-material/Euro';
import StarIcon from '@mui/icons-material/Star';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  card: {
    width: 'calc(33% - 16px)',
    margin: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
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
  const { userRole } = useContext(AuthContext);

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
    <div className={classes.container}>
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
                <EuroIcon fontSize='small' />
                {massage.price} EUR
              </Typography>
              <div className={classes.ratingContainer}>
                {renderStars(massage.averageRating)}
                <Typography variant='body2' color='textSecondary' component='p'>
                  <b>{massage.averageRating}</b> ({massage.totalReviews}{' '}
                  reviews)
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.actionButton}>
            <Button
              variant='contained'
              color='primary'
              component={Link}
              to={`/massages/${massage._id}`}
            >
              See more details
            </Button>
          </CardActions>
        </Card>
      ))}
      {userRole === 'admin' ? (
        <Button variant='contained' href='/massages/new'>
          Add new massage!
        </Button>
      ) : (
        <Button variant='contained' disabled>
          Add new massage!
        </Button>
      )}
    </div>
  );
};

export default Massages;
