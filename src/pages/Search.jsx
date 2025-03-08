import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SongCard, Loader, Error } from '../components';

const Search = () => {
  const { searchTerm } = useParams();
  const { songs, status, error } = useSelector((state) => state.ytmusic);

  if (status === 'loading') return <Loader title={`Searching for "${searchTerm}"...`} />;
  if (status === 'failed') return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="text-white font-bold text-3xl text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard key={song.videoId} song={song} index={i} data={songs} />
        ))}
      </div>
    </div>
  );
};

export default Search;
