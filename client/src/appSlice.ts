import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const views = {
  LOGIN: "login",
  FEED: "feed",
  PROFILE: "profile",
  MESSENGER: "messenger",
  SETTINGS: "settings"
}

export interface AppState {
  value: String;
}

const initialState: AppState = {
  value: views.FEED
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    switchView(state, action: PayloadAction<String>) {
      state.value = action.payload
    },
  },
})

export const { switchView } = appSlice.actions;
export default appSlice.reducer;