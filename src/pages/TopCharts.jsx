import React from 'react';
import { useSelector } from 'react-redux';
import { SongCard, Loader, Error } from '../components';

const TopCharts = () => {
  const { songs, status, error } = useSelector((state) => state.ytmusic);

  if (status === 'loading') return <Loader title="Loading Top Charts..." />;
  if (status === 'failed') return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="text-white font-bold text-3xl text-left mt-4 mb-10">Top Charts</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard key={song.videoId} song={song} index={i} data={songs} />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
