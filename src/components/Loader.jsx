import React from 'react';

const Loader = (
  className = ""
) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
    </div>
  );
};

export default Loader;
