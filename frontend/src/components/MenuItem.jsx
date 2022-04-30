import React from "react";

const MenuItem = (props) => {
  return (
    <>
      
        <div style={{marginLeft: '20px'}}>
          <div >
            <h5 className="foodHeader" style={{display: 'inline'}}>{props.name}</h5>
            <div style={{marginLeft: '80%', display: 'inline', alignSelf: 'end', fontSize: '20px'}}>$ {props.price}</div>
            
            
          </div>
          <p>{props.description}</p>
        </div>
      
    </>
  );
};

export default MenuItem;
