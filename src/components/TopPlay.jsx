import React from 'react';
import { useSelector } from 'react-redux';
import SongBar from './SongBar';

const TopPlay = ({ songs }) => {
  // Show top 5
  const topSongs = songs.slice(0, 5);

  return (
    <div className="mb-6">
      <h2 className="text-white font-bold text-2xl mb-4">Top Charts</h2>
      <div className="flex flex-col gap-1">
        {topSongs.map((song, index) => (
          <SongBar key={song.videoId} song={song} index={index} data={topSongs} />
        ))}
      </div>
    </div>
  );
};

export default TopPlay;
