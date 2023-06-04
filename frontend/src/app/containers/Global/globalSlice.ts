import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../app/store';
import apiRequest from '../../../features/request';
import { ILoginPayload } from '../../components/Header';
import { toast } from 'react-toastify';

export interface GlobalState {
  userEmail: string;
  status: 'idle' | 'loading' | 'failed';
  listOfSharing: [],
}

const initialState: GlobalState = {
  userEmail: '',
  status: 'idle',
  listOfSharing: []
};

export const loginRequest = createAsyncThunk(
  'global/loginRequest',
  async (loginPayload: ILoginPayload) => {

    const response = await apiRequest('/auth/login', 'POST', {...loginPayload});
    localStorage.setItem('ACCESS_TOKEN_KEY',response.data.accessToken);
    return { email: loginPayload.email };
  }
);

export const shareNewVideo = createAsyncThunk(
  'global/shareMovie',
  async (movieLink: string) => {
    const result =  await apiRequest(
      '/video-sharing/create',
      'POST',
      { url: movieLink },
    );
    if (result?.data) {
      toast.success('Video share successfully.')
    }
  }
);

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    logout: (state) => {
      state.userEmail = initialState.userEmail;
      localStorage.removeItem('ACCESS_TOKEN_KEY');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userEmail = action.payload.email;
      })
      .addCase(loginRequest.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(shareNewVideo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(shareNewVideo.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(shareNewVideo.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { logout } = globalSlice.actions;

export const selectGlobalState = (state: RootState) => state.global;

export default globalSlice.reducer;
