import React from "react";

const RestaurantCard = (props) => {
  const cuisines = {"IN": "Indian", "IT": "Italian", "AM": "American", "PI": "Pizza", "CH": "Chinese"}
  return (
    <div class="col mb-5">
                    <div class="card h-100">

                      <img class="card-img-top rounded mx-auto d-block" src={props.image} alt="..." style={{maxWidth: '15em', padding: '20px'}}/>

                      <div class="card-body p-4">
                        <div class="text-center">

                          <h5 class="fw-bolder">{props.name}</h5>

                          
                          Cuisine: {cuisines[props.type]}
                          <br/>
                          Postal Code: {props.post}
                        </div>
                      </div>

                      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto"
                          href={"http://localhost:3000/restaurant/" + props.id}>View</a></div>
                      </div>
                    </div>
                  </div>
  );
};

export default RestaurantCard;
