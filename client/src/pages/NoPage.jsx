import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css"

const NoPage = () => {
  return (
    <div className="no-page-container flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gray-100">
      
      {/* Error Message */}
      <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4">
        404
      </h1>
      
      <p className="text-lg lg:text-xl text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      
      {/* Redirect Button */}
      <Link to="/" className="btnBlue text-white px-6 py-3 rounded-lg bg-[#00AEEF] hover:bg-[#008bbd] transition-all duration-300">
        Go Back to Home
      </Link>
    </div>
  );
}

export default NoPage;
