import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Our combined initial state for songs + player
const initialState = {
  // Songs from the API
  songs: [],
  status: 'idle',   // idle | loading | succeeded | failed
  error: null,

  // Player state
  isPlaying: false,
  currentIndex: 0,
  activeSong: null,
  songUrl: null,
};

// Thunk to fetch songs from your backend
export const fetchSongs = createAsyncThunk('ytmusic/fetchSongs', async (query) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
    console.log('🔵 Full API Response:', response.data);

    if (!Array.isArray(response.data)) {
      console.error('❌ The API response is not an array:', response.data);
      return [];
    }

    // Filter only VIDEO items that have a valid videoId
    const filteredSongs = response.data.filter(
      (item) => item.type === 'VIDEO' && item.videoId
    );

    console.log('✅ Filtered Songs:', filteredSongs);
    return filteredSongs;
  } catch (error) {
    console.error('❌ API Error:', error.response ? error.response.data : error.message);
    throw error;
  }
});

const ytmusicSlice = createSlice({
  name: 'ytmusic',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      const song = action.payload;
      state.activeSong = song;
      state.songUrl = `https://www.youtube.com/watch?v=${song.videoId}`;
      state.isPlaying = true;
      // Also set currentIndex to match this song if it's in our songs array
      const idx = state.songs.findIndex((s) => s.videoId === song.videoId);
      if (idx !== -1) state.currentIndex = idx;
    },
    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
    nextSong: (state) => {
      if (state.currentIndex < state.songs.length - 1) {
        state.currentIndex += 1;
        const next = state.songs[state.currentIndex];
        state.activeSong = next;
        state.songUrl = `https://www.youtube.com/watch?v=${next.videoId}`;
        state.isPlaying = true;
      }
    },
    prevSong: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        const prev = state.songs[state.currentIndex];
        state.activeSong = prev;
        state.songUrl = `https://www.youtube.com/watch?v=${prev.videoId}`;
        state.isPlaying = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.songs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setActiveSong, playPause, nextSong, prevSong } = ytmusicSlice.actions;
export default ytmusicSlice.reducer;
