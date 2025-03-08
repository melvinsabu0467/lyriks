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

  // Update current playback time
  const handleProgress = (state) => {
    setPlayedSeconds(state.playedSeconds);
  };

  // Set the duration when loaded
  const handleDuration = (dur) => {
    setDuration(dur);
  };

  // Seek when slider is moved
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setPlayedSeconds(newTime);
    playerRef.current.seekTo(newTime, 'seconds');
  };

  // Toggle play/pause
  const handlePlayPause = () => {
    dispatch(playPause(!isPlaying));
  };

  // Format seconds into mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!songUrl) {
    return <div className="text-white p-4">No song playing</div>;
  }

  return (
    <div className="w-full fixed bottom-0 left-0 right-0 bg-gradient-to-br from-gray-800 to-black p-4 z-50">
      {/* Hidden ReactPlayer for audio playback */}
      <ReactPlayer
        ref={playerRef}
        url={songUrl}
        playing={isPlaying}
        controls={false}
        width="0"
        height="0"
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={() => dispatch(nextSong())}
      />

      {/* Top section with song info and control buttons */}
      <div className="flex items-center justify-between">
        {/* Song Information */}
        <div className="flex flex-col">
          <h3 className="text-white font-bold text-lg">
            {activeSong?.name || 'Unknown Title'}
          </h3>
          <p className="text-gray-300 text-sm">
            {activeSong?.artist?.name || 'Unknown Artist'}
          </p>
        </div>
        {/* Control Buttons */}
        <div className="flex items-center space-x-4">
          <button onClick={() => dispatch(prevSong())} className="text-white hover:text-gray-300">
            <FaStepBackward size={20} />
          </button>
          <button onClick={handlePlayPause} className="text-white hover:text-gray-300">
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <button onClick={() => dispatch(nextSong())} className="text-white hover:text-gray-300">
            <FaStepForward size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2">
        <input
          type="range"
          min="0"
          max={duration}
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
