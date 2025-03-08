import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SongCard from '../components/SongCard';

const Search = () => {
  const { searchTerm } = useParams();
  const { songs, status, error } = useSelector((state) => state.ytmusic);

  if (status === 'loading') {
    return <p className="text-white">Searching for "{searchTerm}"...</p>;
  }
  if (status === 'failed') {
    return <p className="text-white">Error: {error}</p>;
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-white text-3xl font-bold mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard key={song.videoId} song={song} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Search;
