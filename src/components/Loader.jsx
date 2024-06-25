import React from 'react';

const Loader = (
  {className = ""}
) => {
  console.log(className);
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
    </div>
  );
};

export default Loader;
