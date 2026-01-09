import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, 
};

export const userSlice = createSlice({
  name: 'user', 
  initialState,
  reducers: {
    setNome (state, action) {
      state.user = action.payload;
    },
    
  },
});

export const { setNome } = userSlice.actions;

export default userSlice.reducer;
