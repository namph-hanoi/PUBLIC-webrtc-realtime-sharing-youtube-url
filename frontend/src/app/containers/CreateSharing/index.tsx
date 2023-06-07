import React from 'react'
import Header from '../../components/Header'
import { Box, Button, Container, TextField } from '@mui/material'
import { resetSharingState, shareNewVideo, selectGlobalState } from '../Global/globalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { useThrottledCallback } from 'use-debounce';
import styles from './styles.module.scss';

function CreateSharing() {
  const navigate = useNavigate();
  const [youtubeLink, setYoutubeLink] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const { sharingStatus } = useAppSelector(selectGlobalState);

  const handleShare = useThrottledCallback(() => {
      try {
        dispatch(shareNewVideo(youtubeLink));
      } catch (error) {
        console.error(error);
      }
    },
    1000
  );

  React.useEffect(() => {
    if (sharingStatus === 'suceeded') {
      dispatch(resetSharingState());
      navigate('/');
    }
  }, [sharingStatus, dispatch, navigate]);


  return (
    <div className={styles.wrap}>
      <Header />
      <Container>
        <div className='flex justify-center items-center'>
          <Box className='flex justify-center items-center pt-20'>
            <p className='mr-5'>Share a Youtube movie</p>
            <TextField
              defaultValue={''}
              value={youtubeLink}
              onChange={e => {
                const { value } = e.target;
                setYoutubeLink(value);
              }}
              className={styles.mui_input}
            />
            <Button type='button' variant='contained' onClick={handleShare} className={styles.btn_share}>
              Share
            </Button>
          </Box>
        </div>
      </Container>
    </div>
  )
};

export default React.memo(CreateSharing);
