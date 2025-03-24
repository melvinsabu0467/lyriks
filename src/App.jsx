import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import { fetchSongs } from './redux/services/ytmusicSlice';
import { Sidebar, Searchbar, MusicPlayer, TopPlay } from './components';
import {
  Discover,
  Search,
  TopArtists,
  TopCharts,
  AroundYou,
  ArtistDetails,
  SongDetails,
  PlayerPage,
} from './pages';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { activeSong, status, error, songs } = useSelector((state) => state.ytmusic);

  useEffect(() => {
    // Fetch trending songs on mount
    dispatch(fetchSongs('trending'));
  }, [dispatch]);

  return isAuthenticated ? (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />
        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            {status === 'loading' && <p className="text-white">Loading...</p>}
            {status === 'failed' && <p className="text-white">Error: {error}</p>}
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/player" element={<PlayerPage />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay songs={songs} />
          </div>
        </div>
      </div>
      {/* Only show MusicPlayer if an active song exists */}
      {activeSong && (
        <div
          className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup 
          bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10"
        >
          <MusicPlayer />
        </div>
      )}
    </div>
  ) : (
    // Authentication Routes (for unauthenticated users)
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* Redirect any unmatched route to Signup as default */}
      <Route path="*" element={<Signup />} />
    </Routes>
  );
};

export default App;
