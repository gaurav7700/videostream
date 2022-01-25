import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {

  const navigate = useNavigate()

  return (
    <div className="navbar">
      <ul>
        <li onClick={()=>{navigate("/")}}> 
          Youtube
        </li>
        <li onClick={()=>{navigate("/upload")}}>Upload</li>
      </ul>
    </div>
  );
};

export default Navigation;
