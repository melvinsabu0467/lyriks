import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSong } from '../redux/services/ytmusicSlice';

const SongCard = ({ song, index }) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.ytmusic);

  const handlePlayClick = () => {
    dispatch(setActiveSong(song));
  };

  return (
    <div className="flex flex-col w-[180px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-40 group">
        <img
          src={song?.thumbnails?.[0]?.url || 'https://via.placeholder.com/300'}
          alt={song?.name}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center rounded-lg">
          <button
            onClick={handlePlayClick}
            className="text-white text-lg bg-indigo-600 px-4 py-2 rounded-full"
          >
            {(isPlaying && activeSong?.videoId === song.videoId) ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>

      <div className="mt-2 flex flex-col">
        <p className="font-semibold text-white text-sm truncate">
          {song?.name}
        </p>
        <p className="text-sm text-gray-300 truncate">
          {song?.artist?.name || 'Unknown Artist'}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
