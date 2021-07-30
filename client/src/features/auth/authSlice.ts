import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserToken } from '../../models/user.interface';

export const auths = {
  CONNECTED: "connected",
  DISCONNECTED: "disconnected"
}

export interface AuthState {
  value: string;
  token: IUserToken | null;
}

const initialState: AuthState = {
  value: auths.DISCONNECTED,
  token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    connect(state, action: PayloadAction<IUserToken>) {
      if (action.payload) {
        state.token = action.payload
        state.value = auths.CONNECTED
      }
    },

    disconnect(state) {
      state.value = auths.DISCONNECTED
      state.token = null
    },
  },
})

export const { connect, disconnect } = authSlice.actions;
export default authSlice.reducer;