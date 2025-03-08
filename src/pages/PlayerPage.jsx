import React from 'react';
import { useSelector } from 'react-redux';
import MusicPlayer from '../components/MusicPlayer';

const PlayerPage = () => {
  const { activeSong } = useSelector((state) => state.ytmusic);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-black to-[#121286]">
      {activeSong ? (
        <div className="bg-black p-6 rounded-lg">
          <h2 className="text-white text-xl mb-2">{activeSong.name}</h2>
          <p className="text-gray-400 mb-4">{activeSong.artist?.name || 'Unknown Artist'}</p>
          <MusicPlayer />
        </div>
      ) : (
        <p className="text-white">No song playing</p>
      )}
    </div>
  );
};

export default PlayerPage;
