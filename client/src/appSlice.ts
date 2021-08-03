import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRequest } from './api/user.api';
import emptyAvatar from './assets/img/image 2.png';

export const views = {
  LOGIN: "login",
  FEED: "feed",
  PROFILE: "profile",
  MESSENGER: "messenger",
  SETTINGS: "settings"
}

export interface AppState {
  value: String;
  avatar: string;
}

const initialState: AppState = {
  value: views.FEED,
  avatar: emptyAvatar
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    switchView(state, action: PayloadAction<String>) {
      if (action.payload) state.value = action.payload
    },

    setAvatar(state, action: PayloadAction<string>) {
      state.avatar = 'http://localhost:2048/api/file/file/' + action.payload
    },

    getAvatar(state, action: PayloadAction<string>) {
    }
  },
})

export const { switchView, setAvatar, getAvatar } = appSlice.actions;
export default appSlice.reducer;