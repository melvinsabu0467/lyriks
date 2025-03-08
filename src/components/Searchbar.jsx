import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSongs } from '../redux/services/ytmusicSlice';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchSongs(searchTerm));
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <div className="p-2 w-full flex justify-center items-center bg-[#2c2c54]">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-[500px] bg-[#1f1f3c] rounded-full px-4 py-2"
      >
        <input
          type="text"
          placeholder="Search for songs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="text-white font-semibold hover:text-cyan-400"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
