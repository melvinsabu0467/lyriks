import { configureStore } from '@reduxjs/toolkit';
import ytmusicReducer from './services/ytmusicSlice';

export const store = configureStore({
  reducer: {
    ytmusic: ytmusicReducer,
  },
});
