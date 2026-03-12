import React from 'react';

const Header = () => {
  
  return (
    <>
    
      <div
        className="header"
        style={{
          position: "absolute",
          top: "5px",
          left: "50px",
          height: "50px",
          width: "1400px",
          border: "1px solid #444",
          borderRadius: "50px",
          backgroundColor: "trasparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "10px",
          color: "white",
        }}
      >
        <div style={{ height: "40px" }}>
          <img
            className="logo"
            src="logo.png"
            style={{ height: "40px", marginLeft: "20px",
  userSelect: "none" }}
          />
        </div>

        <div
          className="headerContent"
          style={{
            display: "flex",
            alignItems: "centre",
            justifyContent: "space-around",
            gap: "80px",
            marginRight: "50px",
            userSelect:"none"
          }}
        >
         <a href="/" >HOME</a>
          <a href="bikes" >BIKES</a>
          <a href="contact" >CONTACT</a>
        

        </div>
      </div>

    </>
  );
};

export default Header;