import { configureStore } from '@reduxjs/toolkit';
import ytmusicReducer from './services/ytmusicSlice'; // Ensure this path is correct
import authReducer from './features/authSlice'; // Ensure this path is correct

export const store = configureStore({
  reducer: {
    ytmusic: ytmusicReducer,
    auth: authReducer,
  },
});
