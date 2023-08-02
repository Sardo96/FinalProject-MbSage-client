import { Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(4),
    textAlign: 'center'
  },
  heading: {
    fontSize: '3rem',
    marginBottom: theme.spacing(2)
  },
  subheading: {
    fontSize: '1.5rem',
    marginBottom: theme.spacing(4)
  },
  buttonContainer: {
    display: 'flex',
    gap: theme.spacing(2)
  }
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='h1' className={classes.heading}>
        Welcome to my Massage App
      </Typography>
      <Typography variant='h2' className={classes.subheading}>
        Relax, Rejuvenate, and Reconnect
      </Typography>
      <div className={classes.buttonContainer}>
        <Button
          variant='contained'
          color='secondary'
          component={RouterLink}
          to='/massages'
        >
          Check Our Massages
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          component={RouterLink}
          to='/signup'
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
