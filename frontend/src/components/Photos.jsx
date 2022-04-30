import React from "react";
import Logo from "./Logo";
import Photo from "./Photo";

const Photos = (props) => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide "
      data-bs-ride="carousel"
      style={{width: '650px', alignSelf: 'center', justifySelf: 'center'}}
    >
      <div className="carousel-inner">
        <Logo assetURL={props.logo} />
        {
            [props.assetURLs.map(image => <Photo key={`http://localhost:8000${image.image}`} assetURL={`http://localhost:8000${image.image}`}/>)]
        }
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Photos;
