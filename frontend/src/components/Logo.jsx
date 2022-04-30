import React from "react";

const Logo = (props) => {
  return (
    <div className="carousel-item active">
      <img src={props.assetURL} className="d-block w-100" alt="..." style={{maxWidth: '650px'}}/>
    </div>
  );
};

export default Logo;
