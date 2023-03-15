import React from "react";
import "./Widget.css";
import WidgetOptions from "./WidgetOptions";

const Widget = () => {
  return (
    <div className="widget flex-[20%]">
      <div className="widget-header">
        <h5>광고입니다</h5>
      </div>
      <div className="widget-contents">
        <WidgetOptions />
      </div>
    </div>
  );
};

export default Widget;
