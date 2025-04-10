import React from 'react';
import { MdOutlineExitToApp } from 'react-icons/md';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom"; // Correct import for useNavigate

function About() {
  const navigate = useNavigate(); // useNavigate inside the component

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Flex container for side-by-side layout */}
      <div className="flex flex-col md:flex-row justify-around items-start container mx-auto py-10 px-5 md:px-20">
        
        {/* About Content */}
        <div className="flex-1 md:max-w-[50%] mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg mb-3">
            Hello, I'm Shivanshu. I am a BCA final year student with skills in
            MERN stack development and problem solving. I have worked on various
            projects including weather apps, online IDEs, and editor projects.
          </p>
          <p className="text-lg mb-6">
            My areas of expertise include frontend technologies like React and
            backend development with Node.js and MongoDB. I am also preparing for
            technical interviews with a focus on communication skills and DSA.
          </p>
        </div>

        {/* Back Button */}
        <div
          onClick={() => {
            navigate("/"); // Navigate back to home
          }}
          className="flex flex-col items-center justify-center gap-2 px-4 py-2 bg-gray-600 rounded-md cursor-pointer transition-all hover:bg-gray-700 active:bg-gray-800 w-max"
        >
          <i className="flex p-2 bg-black rounded-md cursor-pointer text-white items-center justify-center">
            <MdOutlineExitToApp size={24} />
          </i>
          <span className="text-white text-[14px] md:text-[16px]">Back</span>
        </div>
      </div>
    </div>
  );
}

export default About;
