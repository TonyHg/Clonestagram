import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ProfileState {
  userId: string;
}

const initialState: ProfileState = {
  userId: "",
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      if (action.payload) {
        state.userId = action.payload
      }
    }
  }
})

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;