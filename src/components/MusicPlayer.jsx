import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import { playPause, nextSong, prevSong } from '../redux/services/ytmusicSlice';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { songUrl, isPlaying, currentIndex, songs, activeSong } = useSelector(
    (state) => state.ytmusic
  );

  const playerRef = useRef(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);

  if (!songUrl) {
    return <div className="text-white p-4">No song playing</div>;
  }

  const handleProgress = (state) => {
    setPlayedSeconds(state.playedSeconds);
  };

  const handleDuration = (dur) => {
    setDuration(dur);
  };

  // Seek on slider change
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setPlayedSeconds(newTime);
    playerRef.current.seekTo(newTime, 'seconds');
  };

  // Toggle play/pause
  const handlePlayPause = () => {
    dispatch(playPause(!isPlaying));
  };

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = Math.floor(secs % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleEnded = () => {
    if (currentIndex < songs.length - 1) {
      dispatch(nextSong());
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center px-4 py-2">
      {/* Hidden ReactPlayer for audio only */}
      <ReactPlayer
        ref={playerRef}
        url={songUrl}
        playing={isPlaying}
        controls={false}
        width="0"
        height="0"
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={handleEnded}
      />

      {/* Player Controls */}
      <div className="flex items-center justify-between w-full max-w-2xl">
        {/* Song info */}
        <div className="flex flex-col mr-4">
          <h3 className="text-white font-bold text-md truncate max-w-[200px]">
            {activeSong?.name || 'Unknown Title'}
          </h3>
          <p className="text-gray-300 text-sm">
            {activeSong?.artist?.name || 'Unknown Artist'}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => dispatch(prevSong())}
            className="text-white hover:text-gray-300"
          >
            <FaStepBackward size={20} />
          </button>
          <button
            onClick={handlePlayPause}
            className="text-white hover:text-gray-300"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <button
            onClick={() => dispatch(nextSong())}
            className="text-white hover:text-gray-300"
          >
            <FaStepForward size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col w-full max-w-2xl mt-2">
        <input
          type="range"
          min="0"
          max={duration.toFixed(2)}
          step="0.1"
          value={playedSeconds}
          onChange={handleSeek}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{formatTime(playedSeconds)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
