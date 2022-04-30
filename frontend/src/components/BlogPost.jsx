import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import authHeader from "../services/auth-header";

const BlogPost = (props) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [likeStatus, setLikeStatus] = useState("None");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/restaurant/getBlogPost/${props.id}/`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res.data);
        setLikeCount(Number(res.data.likes_count));
        setDislikeCount(Number(res.data.dislikes_count));
        setLikeStatus(res.data.like_status);
      });
  }, []);

  function likePost() {
    if (likeStatus === "None") {
      axios
        .post(
          `http://localhost:8000/socials/blog/${props.id}/like_or_dislike/`,
          { type: "Like" },
          { headers: authHeader() }
        )
        .then((res) => {
          setLikeCount(likeCount + 1);
          setLikeStatus("Like");
        });
    } else if (likeStatus === "Like") {
      axios
        .delete(
          `http://localhost:8000/socials/blog/${props.id}/delete_like_or_dislike/`,
          { headers: authHeader() }
        )
        .then((res) => {
          setLikeCount(likeCount - 1);
          setLikeStatus("None");
        });
    } else {
      axios
        .patch(
          `http://localhost:8000/socials/blog/${props.id}/update_like_or_dislike/`,
          { type: "Like" },
          { headers: authHeader() }
        )
        .then((res) => {
          setDislikeCount(dislikeCount - 1);
          setLikeCount(likeCount + 1);
          setLikeStatus("Like");
        });
    }
  }
  function dislikePost() {
    if (likeStatus === "None") {
      axios
        .post(
          `http://localhost:8000/socials/blog/${props.id}/like_or_dislike/`,
          { type: "Dislike" },
          { headers: authHeader() }
        )
        .then((res) => {
          setDislikeCount(dislikeCount + 1);
          setLikeStatus("Dislike");
        });
    } else if (likeStatus === "Dislike") {
      axios
        .delete(
          `http://localhost:8000/socials/blog/${props.id}/delete_like_or_dislike/`,
          { headers: authHeader() }
        )
        .then((res) => {
          setDislikeCount(dislikeCount - 1);
          setLikeStatus("None");
        });
    } else {
      axios
        .patch(
          `http://localhost:8000/socials/blog/${props.id}/update_like_or_dislike/`,
          { type: "Dislike" },
          { headers: authHeader() }
        )
        .then((res) => {
          setLikeCount(likeCount - 1);
          setDislikeCount(dislikeCount + 1);
          setLikeStatus("Dislike");
        });
    }
  }

  return (
    <div className="card w-100 mb-5 mt-3">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.content}</p>
        {
          localStorage.getItem("user") && <>
          {likeStatus === "Like" ? (
          <>
            <button onClick={() => likePost()} className="btn btn-success">
              <i className="bi bi-hand-thumbs-up-fill">{likeCount}</i>
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => dislikePost()}
              className="btn btn-outline-danger"
            >
              <i className="bi bi-hand-thumbs-down-fill">{dislikeCount}</i>
            </button>
          </>
        ) : likeStatus === "Dislike" ? (
          <>
            <button
              onClick={() => likePost()}
              className="btn btn-outline-success"
            >
              <i className="bi bi-hand-thumbs-up-fill">{likeCount}</i>
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => dislikePost()}
              className="btn btn-danger"
            >
              <i className="bi bi-hand-thumbs-down-fill">{dislikeCount}</i>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => likePost()}
              className="btn btn-outline-success"
            >
              <i className="bi bi-hand-thumbs-up-fill">{likeCount}</i>
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => dislikePost()}
              className="btn btn-outline-danger"
            >
              <i className="bi bi-hand-thumbs-down-fill">{dislikeCount}</i>
            </button>
          </>
        )}
          </>
        }
        {
          props.myRest && (<button
            style={{ marginLeft: "10px" }}
            onClick={()=>{
              axios.delete("http://localhost:8000/restaurant/deleteBlog/"+props.id +"/", {headers: authHeader()}).then(()=>{
               props.refresh()
              })
            }}
            className="btn btn-danger"
          >
            Delete
          </button>)
        }
      </div>
    </div>
  );
};

export default BlogPost;
