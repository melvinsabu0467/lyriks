import React from 'react';
import { useSelector } from 'react-redux';
import { Loader, Error } from '../components';

const TopArtists = () => {
  const { songs, status, error } = useSelector((state) => state.ytmusic);

  if (status === 'loading') return <Loader title="Loading Top Artists..." />;
  if (status === 'failed') return <Error />;

  // Filter or map only artist-type data if you have it
  const artistItems = songs.filter((item) => item.type === 'ARTIST');

  return (
    <div className="flex flex-col">
      <h2 className="text-white font-bold text-3xl text-left mt-4 mb-10">Top Artists</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {artistItems.map((artist) => (
          <div
            key={artist.artistId}
            className="flex flex-col w-[180px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-lg"
          >
            <img
              src={artist?.thumbnails?.[0]?.url || 'https://via.placeholder.com/300'}
              alt={artist.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-white font-semibold mt-2 truncate">{artist.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
