import React from 'react';

const Loader = ({ title }) => (
  <div className="flex flex-col justify-center items-center mt-20">
    <div className="loader mb-4" />
    <h2 className="text-white text-lg font-bold">{title || 'Loading...'}</h2>
  </div>
);

export default Loader;



