import { useState } from "react";
import dotenv from "dotenv"

export const toggleClass = (el,className) => {
  let elem = document.querySelector(el);
  elem.classList.toggle(className);
};

export const removeClass = (el,className) => {
  let elem = document.querySelector(el);
  elem.classList.remove(className);
};

export const api_base_url = import.meta.env.VITE_BACKEND_URL;
console.log("api_base_url", api_base_url);

