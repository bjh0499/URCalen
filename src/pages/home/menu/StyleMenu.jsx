import React from "react";

export default function StyleMenu() {
  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className="style-menu-box bg-slate-100 z-100"
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        zIndex: "100",
        height: "400px",
        marginTop: "-200px",
        width: "600px",
        marginLeft: "-300px",
      }}
      onClick={handleMenuClick}
    >
      StyleMenu
    </div>
  );
}
