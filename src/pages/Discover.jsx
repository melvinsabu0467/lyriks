import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongs } from '../redux/services/ytmusicSlice';
import { SongCard, Loader, Error } from '../components'; // Import your components

const Discover = () => {
  const dispatch = useDispatch();
  const { songs, status, error } = useSelector((state) => state.ytmusic);

  React.useEffect(() => {
    dispatch(fetchSongs('trending')); // Example: fetch trending on load
  }, [dispatch]);

  if (status === 'loading') return <Loader title="Loading songs..." />;
  if (status === 'failed') return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="text-white font-bold text-3xl text-left">Discover</h2>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard key={song.videoId} song={song} index={i} data={songs} />
        ))}
      </div>
    </div>
  );
};

export default Discover;
