import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = localStorage.getItem('a2z_user')
  ? JSON.parse(localStorage.getItem('a2z_user'))
  : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: userFromStorage },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('a2z_user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('a2z_user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;