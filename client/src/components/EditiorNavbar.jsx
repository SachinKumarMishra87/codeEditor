import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { api_base_url } from "../helper"; // Assuming you have an API base URL in a helper file
import { MdOutlineExitToApp } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const EditiorNavbar = ({ projectID }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); // State to hold the title
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_base_url}/getProject`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"), // Assuming you have userId in localStorage
            projId: projectID, // Replace with your dynamic project ID
          }),
        });

        const data = await response.json();
        setTitle(data.project.title); // Assuming the title is in data.project.title
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the function to fetch data
  }, []); // Empty dependency array means this effect runs once after the first render

  return (
    <div className="EditiorNavbar flex items-center justify-between px-4 md:px-[50px] lg:px-[100px] h-[60px] md:h-[80px] bg-[#141414]">
      <div className="logo">
        <img
          className="logoImg w-[100px] md:w-[150px] cursor-pointer"
          src={logo}
          alt="logo"
        />
      </div>
      <p className="text-sm md:text-base">
        File / <span className="text-[#ffffff94] proTitle">{title}</span>
      </p>
      <div
        onClick={() => {
          navigate("/");
          window.location.reload();
        }}
        className="flex items-center justify-center gap-[3px] px-[7px] py-[3px] bg-gray-600 rounded-md cursor-pointer transition-all hover:bg-gray-700 active:bg-gray-800"
      >
        <i className="flex p-[3px] bg-black rounded-md cursor-pointer text-[20px] text-white">
          <MdOutlineExitToApp />
        </i>
        <span className="text-[14px] text-white transition-all md:text-[16px]">
          Back
        </span>
      </div>
    </div>
  );
};

export default EditiorNavbar;
