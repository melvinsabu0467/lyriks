import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader, Error } from '../components';

const SongDetails = () => {
  const { songid } = useParams();
  const { songs, status, error } = useSelector((state) => state.ytmusic);

  if (status === 'loading') return <Loader title="Loading song details..." />;
  if (status === 'failed') return <Error />;

  const song = songs.find((item) => item.videoId === songid);

  if (!song) {
    return (
      <div className="flex justify-center items-center">
        <h2 className="text-white text-xl">Song not found.</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-white font-bold text-3xl mb-4">{song.name}</h2>
      <p className="text-gray-300 mb-4">By {song.artist?.name || 'Unknown Artist'}</p>
      {/* Additional details like lyrics, description, etc. */}
      <div className="text-white">
        <p className="mb-2">Duration: {song.duration} seconds</p>
        {/* If you had lyrics or extra metadata, display here */}
        <p>Song details/lyrics go here...</p>
      </div>
    </div>
  );
};

export default SongDetails;
