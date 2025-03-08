import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSong } from '../redux/services/ytmusicSlice';

const SongBar = ({ song, index, data }) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.ytmusic);

  const handlePlayClick = () => {
    dispatch(setActiveSong(song));
  };

  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 px-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-16 h-16 rounded-lg"
          src={song?.thumbnails?.[0]?.url || 'https://via.placeholder.com/300'}
          alt={song?.name}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <p className="text-xl font-bold text-white truncate">
            {song?.name}
          </p>
          <p className="text-base text-gray-300 mt-1 truncate">
            {song?.artist?.name || 'Unknown Artist'}
          </p>
        </div>
      </div>
      <button
        onClick={handlePlayClick}
        className="text-white bg-indigo-600 px-3 py-1 rounded-full"
      >
        {isPlaying && activeSong?.videoId === song.videoId ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default SongBar;
