import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader, Error, SongBar } from '../components';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { songs, status, error } = useSelector((state) => state.ytmusic);

  // In a real app, you'd fetch the artist details by ID
  // Here, we just filter from existing songs for demonstration
  const artistSongs = songs.filter((item) => item.artistId === artistId);

  if (status === 'loading') return <Loader title="Loading artist details..." />;
  if (status === 'failed') return <Error />;

  if (!artistSongs.length) {
    return (
      <div className="flex justify-center items-center">
        <h2 className="text-white text-xl">No songs found for this artist.</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Artist Info (Placeholder) */}
      <div className="mb-6">
        <h2 className="text-white font-bold text-3xl">{artistSongs[0].artist?.name}</h2>
      </div>

      {/* Display artist songs */}
      <div className="flex flex-col gap-1">
        {artistSongs.map((song, i) => (
          <SongBar key={song.videoId} song={song} index={i} data={artistSongs} />
        ))}
      </div>
    </div>
  );
};

export default ArtistDetails;
