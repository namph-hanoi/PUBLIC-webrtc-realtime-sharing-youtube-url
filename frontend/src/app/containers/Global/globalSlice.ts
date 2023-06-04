import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../app/store';
import apiRequest from '../../../features/request';
import { ILoginPayload } from '../../components/Header';

export interface GlobalState {
  userEmail: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: GlobalState = {
  userEmail: '',
  status: 'idle',
};
export const loginRequest = createAsyncThunk(
  'global/loginRequest',
  async (loginPayload: ILoginPayload) => {

    const response = await apiRequest('/auth/login', 'POST', {...loginPayload});
    localStorage.setItem('ACCESS_TOKEN_KEY',response.data.accessToken);
    console.log(["🚀 ~ file: globalSlice.ts:21 ~ response:", response]);
    return { email: loginPayload.email };
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
      });
  },
});

export const { logout } = globalSlice.actions;

export const selectGlobalState = (state: RootState) => state.global;

export default globalSlice.reducer;
