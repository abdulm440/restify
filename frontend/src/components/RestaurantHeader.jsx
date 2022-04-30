import React from "react";

const RestaurantHeader = (props) => {
  return (
    <header className="bg-dark py-5">
      <div className="container px-4 px-lg-5 my-1">
        <div className="text-center text-white">
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h1 className="display-4 fw-bolder">{props.restaurant}</h1>
            <a
              className="btn btn-outline-light"
              style={{marginLeft: "30px"}}
              href="dominos.html"
            >
              {" "}
              <i className="bi bi-arrow-left"></i> Back To Restaurant Profile
            </a>
          </div>
          <p className="lead fw-normal text-white-50 mb-0">
            {props.address}
          </p>
        </div>
      </div>
    </header>
  );
};

export default RestaurantHeader;
