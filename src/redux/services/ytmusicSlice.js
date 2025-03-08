import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// initialState is defined as:
const initialState = {
  songs: [],          // Array of songs fetched from the API
  status: 'idle',     // API status: idle | loading | succeeded | failed
  error: null,        // Error message if any

  // Player state
  isPlaying: false,
  currentIndex: 0,
  activeSong: null,
  songUrl: null,
};

export const fetchSongs = createAsyncThunk('ytmusic/fetchSongs', async (query) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
    console.log("🔵 Full API Response:", response.data);

    if (!Array.isArray(response.data)) {
      console.error("❌ The API response is not an array:", response.data);
      return [];
    }

    // Filter only VIDEO items with a valid videoId:
    const filteredSongs = response.data.filter(
      (item) => item.type === "VIDEO" && item.videoId
    );

    console.log("✅ Filtered Songs:", filteredSongs);
    return filteredSongs;
  } catch (error) {
    console.error("❌ API Error:", error.response ? error.response.data : error.message);
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
    },
    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
    nextSong: (state) => {
      if (state.currentIndex < state.songs.length - 1) {
        state.currentIndex += 1;
        state.activeSong = state.songs[state.currentIndex];
        state.songUrl = `https://www.youtube.com/watch?v=${state.activeSong.videoId}`;
      }
    },
    prevSong: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.activeSong = state.songs[state.currentIndex];
        state.songUrl = `https://www.youtube.com/watch?v=${state.activeSong.videoId}`;
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
