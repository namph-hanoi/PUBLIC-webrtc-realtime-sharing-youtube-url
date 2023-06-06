import React from 'react'
import Header from '../../components/Header'
import { Box, Button, Container, TextField } from '@mui/material'
import { resetSharingState, shareNewVideo, selectGlobalState } from '../Global/globalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';

export default function CreateSharing() {
  const navigate = useNavigate();
  const [youtubeLink, setYoutubeLink] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const { sharingStatus } = useAppSelector(selectGlobalState);

  const handleShare = () => {
    try {
      dispatch(shareNewVideo(youtubeLink));
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (sharingStatus === 'suceeded') {
      dispatch(resetSharingState());
      navigate('/');
    }
  }, [sharingStatus, dispatch, navigate]);


  return (
    <>
      <Header />
      <Container>
        <div className='flex justify-center items-center'>
          <Box className='flex justify-center items-center pt-20'>
            <p>Share a Youtube movie</p>
            <TextField
              defaultValue={''}
              value={youtubeLink}
              onChange={e => {
                const { value } = e.target;
                setYoutubeLink(value);
              }}
            />
            <Button type='button' onClick={handleShare}>Share</Button>
          </Box>
        </div>
      </Container>
    </>
  )
}
