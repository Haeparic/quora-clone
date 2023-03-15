import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import "./QuoraBox.css";

const QuoraBox = () => {
  const user = useSelector(selectUser);
  return (
    <div className="quoraBox flex flex-col  p-[10px] cursor-pointer">
      <div className="quoraBox-info flex items-center">
        <Avatar src={user.photo} />
        <h5>{user.displayName}</h5>
      </div>
      <div className="quoraBox-quora flex mt-[8px]">
        <p>무엇이 궁금하신가요?</p>
      </div>
    </div>
  );
};

export default QuoraBox;
