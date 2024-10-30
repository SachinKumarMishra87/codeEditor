import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { BsGridFill } from "react-icons/bs";
import { api_base_url, toggleClass } from "../helper";

const Navbar = ({ isGridLayout, setIsGridLayout }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.user);
        } else {
          setError(data.message);
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  return (
    <>
      <div className="navbar  flex items-center justify-between px-[20px] md:px-[100px] h-[60px] md:h-[80px] bg-[#141414]">
        <div className="logo ">
          <img
            className="w-[100px] md:w-[150px] cursor-pointer"
            src={logo}
            alt="Logo"
          />
        </div>
        <div className="flex">
          <div className="links md:flex items-center gap-2">
            <div className="links hidden md:flex items-center gap-2">
            <Link 
  to="/about" 
  className="text-[14px] md:text-[16px] bg-[#354b60] px-2 py-1 rounded-lg">
  About Me
</Link>
              <button
                onClick={logout}
                className="btnBlue min-w-[80px] md:min-w-[120px] ml-2 text-[12px] md:text-[14px]"
              >
                Logout
              </button>
            </div>
            <div>
              <Avatar
                onClick={() => {
                  toggleClass(".dropDownNavbar", "hidden");
                }}
                name={data ? data.name : ""}
                size="40"
                md:size="40"
                round="50%"
                className="avtar cursor-pointer ml-2"
              />
            </div>
          </div>
        </div>
        <div className="dropDownNavbar hidden absolute right-[20px] md:right-[60px] top-[60px] md:top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-lg bg-[#1A1919] w-[150px] h-[120px]">
          <div className="py-[10px] border-b-[1px] border-b-[#fff]">
            <h3
              className="text-[14px] md:text-[17px]"
              style={{ lineHeight: 1 }}
            >
              {data ? data.name : ""}
            </h3>
          </div>
          <i
            onClick={() => {
              setIsGridLayout(!isGridLayout);
              toggleClass(".dropDownNavbar", "hidden");
            }}
            className="flex items-center gap-2 mt-3 mb-2 cursor-pointer"
            style={{ fontStyle: "normal" }}
          >
            <BsGridFill className="text-[18px] md:text-[20px]" />{" "}
            {isGridLayout ? "List" : "Grid"} layout
          </i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
