import React from "react";

const Comment = (props) => {
  return (
    <>
      <div className="card">
        <div className="card-header">{props.title}</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>
              {props.content}
            </p>
            <footer className="blockquote-footer">
              {props.name} commented on <i>{props.date}</i>
            </footer>
          </blockquote>
        </div>
      </div>
      <br />
    </>
  );
};

export default Comment;
