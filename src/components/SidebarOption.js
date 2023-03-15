import { Add } from "@mui/icons-material";
import React from "react";
import "./SidebarOption.css";

const SidebarOption = () => {
  return (
    <div className="flex flex-col">
      <div className="sidebarOption">
        <img src="./images/sec02_img07.png" alt="" />
        <p>꽃게랑</p>
      </div>
      <div className="sidebarOption">
        <img src="./images/sec02_img01.png" alt="" />
        <p>아이스크림</p>
      </div>
      <div className="sidebarOption">
        <img src="./images/sec02_img02.png" alt="" />
        <p>바나나우유</p>
      </div>
      <div className="sidebarOption">
        <img src="./images/sec02_img03.png" alt="" />
        <p>요거트</p>
      </div>
      <div className="sidebarOption">
        <Add />
        <p>더보기</p>
      </div>
    </div>
  );
};

export default SidebarOption;
