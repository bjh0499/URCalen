import React from "react";

export default function Modal({ children }) {
  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  // https://stackoverflow.com/questions/6334495/
  return (
    <div
      className="style-menu-box bg-slate-100 z-100"
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        zIndex: "10",
        height: "400px",
        marginTop: "-200px",
        width: "600px",
        marginLeft: "-300px",
      }}
      onClick={handleMenuClick}
    >
      {children}
    </div>
  );
}
