import React from 'react'
import Header from '../../components/Header'
import { Box, Button, Container, TextField } from '@mui/material'
import { shareNewVideo } from '../Global/globalSlice';
import { useAppDispatch } from '../../hooks';

export default function CreateSharing() {
  const [youtubeLink, setYoutubeLink] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const handleShare = () => {
    try {
      dispatch(shareNewVideo(youtubeLink));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div className='flex justify-center items-center'>
          <Box>
            Share a Youtube movie
            <TextField
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
