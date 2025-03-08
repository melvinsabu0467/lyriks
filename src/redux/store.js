import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './features/playerSlice'
import ytmusicReducer from './services/ytmusicSlice'; // ✅ Correct import

export const store = configureStore({
  reducer: {
    player: playerReducer,
    ytmusic: ytmusicReducer,
  },
});
