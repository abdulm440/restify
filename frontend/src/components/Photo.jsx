import React from "react";

const Photo = (props) => {
  return (
    <div className="carousel-item">
      <img src={props.assetURL} className="d-block w-100" alt="..." style={{maxWidth: '650px'}}/>
    </div>
  );
};

export default Photo;
