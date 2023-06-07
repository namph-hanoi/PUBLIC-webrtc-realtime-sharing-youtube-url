import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import apiRequest from '../../../features/request';
import { ILoginPayload } from '../../components/Header';
import { toast } from 'react-toastify';

type RequestStatus = 'idle' | 'loading' | 'failed' | 'suceeded';

export interface GlobalState {
  userEmail: string;
  loginStatus: RequestStatus;
  sharingStatus: RequestStatus;
  listOfSharing: any[];
  globalLoading: boolean;
}

const initialState: GlobalState = {
  userEmail: '',
  loginStatus: 'idle',
  sharingStatus: 'idle',
  listOfSharing: [],
  globalLoading: false,
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
    return 'suceeded';
  }
);

export const getAllSharings = createAsyncThunk(
  'global/getMovies',
  async () => {
    const result =  await apiRequest(
      '/video-sharing/',
      'GET',
    );
    if (result?.data) {
      return result.data;
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
    resetSharingState: (state) => {
      state.sharingStatus = 'idle';
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
        state.globalLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, (state) => {
        state.loginStatus = 'loading';
        state.globalLoading = true;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.loginStatus = 'idle';
        state.userEmail = action.payload.email;
        state.globalLoading = false;
      })
      .addCase(loginRequest.rejected, (state) => {
        state.loginStatus = 'failed';
        state.globalLoading = false;
      })
      .addCase(shareNewVideo.pending, (state, action: PayloadAction) => {
        state.sharingStatus = 'loading';
        state.globalLoading = true;
      })
      .addCase(shareNewVideo.fulfilled, (state, action) => {
        if (action.payload) {
          state.sharingStatus = 'suceeded';
        }
        state.globalLoading = false;
      })
      .addCase(shareNewVideo.rejected, (state) => {
        state.sharingStatus = 'failed';
        state.globalLoading = false;
      })
      .addCase(getAllSharings.pending, (state, action: PayloadAction) => {
        state.globalLoading = true;
      })
      .addCase(getAllSharings.fulfilled, (state, action) => {
        state.listOfSharing = action.payload.reverse();
        state.globalLoading = false;
      })
      .addCase(getAllSharings.rejected, (state) => {
        state.globalLoading = false;
      });
  },
});

export const { resetSharingState, setGlobalLoading,  logout } = globalSlice.actions;

export const selectGlobalState = (state: RootState) => state.global;

export default globalSlice.reducer;
