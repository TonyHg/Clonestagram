import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const auths = {
  CONNECTED: "connected",
  DISCONNECTED: "disconnected"
}

export interface AuthState {
  value: String;
  token: String | null;
}

const initialState: AuthState = {
  value: auths.DISCONNECTED,
  token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    connect(state) {
      state.value = auths.CONNECTED
    },

    disconnect(state) {
      state.value = auths.DISCONNECTED
      state.token = null
    },
  },
})

export const { connect, disconnect } = authSlice.actions;
export default authSlice.reducer;