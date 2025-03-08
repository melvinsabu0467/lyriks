import React from 'react';
import { useSelector } from 'react-redux';
import { SongCard, Loader, Error } from '../components';

const AroundYou = () => {
  const { songs, status, error } = useSelector((state) => state.ytmusic);

  if (status === 'loading') return <Loader title="Loading local songs..." />;
  if (status === 'failed') return <Error />;

  // If you had a custom fetch for region-based songs, you'd call that here
  return (
    <div className="flex flex-col">
      <h2 className="text-white font-bold text-3xl text-left mt-4 mb-10">Around You</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard key={song.videoId} song={song} index={i} data={songs} />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
