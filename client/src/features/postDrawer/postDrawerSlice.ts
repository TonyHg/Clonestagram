import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface PostDrawerState {
  drawer: boolean;
  postId?: string;
}

const initialState: PostDrawerState = {
  drawer: false,
  postId: undefined
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    select(state, action: PayloadAction<string>) {
      if (action.payload) {
        state.drawer = true
        state.postId = action.payload
      }
    },
    unselect(state) {
      state.drawer = false
      state.postId = undefined
    }

  }
})

export const { select, unselect } = postSlice.actions;
export default postSlice.reducer;
