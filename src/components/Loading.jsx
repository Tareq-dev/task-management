import React from "react";
import loading from "../assets/loading.svg";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0,0)",
        zIndex: 9999,
      }}
    >
      <div>
        <img alt="" src={loading} />
      </div>
    </div>
  );
};

export default Loading;
