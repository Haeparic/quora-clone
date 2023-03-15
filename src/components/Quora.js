import React from "react";
import Feed from "./Feed";
import Navbar from "./Navbar";
import "./Quora.css";
import Sidebar from "./Sidebar";
import Widget from "./Widget";

const Quora = () => {
  return (
    <div className="quora">
      <Navbar />
      <div className="quora-content flex justify-center mt-[50px]">
        <Sidebar  />
        <Feed />
        <Widget />
      </div>
    </div>
  );
};

export default Quora;
