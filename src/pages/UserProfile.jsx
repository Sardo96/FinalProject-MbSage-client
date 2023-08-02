import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { getUserProfile } from '../api/auth.api';
import { Typography, Avatar, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const UserProfile = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [profileData, setProfileData] = useState([]);

  const fetchProfileData = async () => {
    try {
      const response = await getUserProfile();
      setProfileData(response.data);
    } catch (error) {
      console.log('Error fetching user profile', error);
    }
  };

  useState(() => {
    if (isLoggedIn) {
      fetchProfileData();
    }
  }, [isLoggedIn]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4
      }}
    >
      {profileData ? (
        <>
          <Avatar src={profileData.photo} sx={{ width: 100, height: 100 }} />
          <Typography variant='h5' gutterBottom>
            {profileData.firstName} {profileData.lastName}
          </Typography>
          <Typography variant='body1' gutterBottom>
            Email: {profileData.email}
          </Typography>
          <Typography variant='body1' gutterBottom>
            Birthday: {profileData.birthday}
          </Typography>
          <Typography variant='body1' gutterBottom>
            Phone: {profileData.phone}
          </Typography>
          <Typography variant='body1' gutterBottom>
            Gender: {profileData.gender}
          </Typography>
          <Typography variant='body1' gutterBottom>
            Allergies: {profileData.allergies}
          </Typography>
          <Button
            component={RouterLink}
            to={`/account/edit-profile`}
            variant='contained'
            color='primary'
            sx={{ mt: 2 }}
          >
            Edit Profile
          </Button>
        </>
      ) : (
        <Typography variant='body1'>Loading...</Typography>
      )}
    </Box>
  );
};

export default UserProfile;
