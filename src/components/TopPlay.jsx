import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import SongBar from './SongBar';

const TopPlay = ({ songs }) => {
  const divRef = useRef(null);
  const topSongs = songs.slice(0, 5); // Show only top 5

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          {/* Could add a "See More" link */}
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topSongs.map((song, index) => (
            <SongBar key={song.videoId} song={song} index={index} data={topSongs} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPlay;
