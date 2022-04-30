import axios from "axios";
import React from "react";
import { useState } from "react";
import authHeader from "../services/auth-header";
import { useEffect } from "react";

const RestaurantProfileHeader = (props) => {
  const [followStatus, setFollowStatus] = useState("None");
  const [likeStatus, setLikeStatus] = useState("None");
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [followCount, setFollowCount] = useState(0);
  const restaurantID = props.restaurantID;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/restaurant/getRestaurant/${restaurantID}/`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res.data);
        setLikeCount(Number(res.data.likes_count));
        setDislikeCount(Number(res.data.dislikes_count));
        setLikeStatus(res.data.like_status);
        setFollowCount(res.data.followers_count);
        setFollowStatus(res.data.follow_status);
      });
  }, []);

  function handleFollow() {
    if (followStatus === "None") {
      axios
        .post(
          `http://localhost:8000/socials/${restaurantID}/follow/`,
          {},
          { headers: authHeader() }
        )
        .then((res) => {
          setFollowStatus("Follow");
          setFollowCount(followCount + 1);
        });
    } else if (followStatus === "Follow") {
      axios
        .delete(`http://localhost:8000/socials/${restaurantID}/unfollow/`, {
          headers: authHeader(),
        })
        .then((res) => {
          setFollowStatus("None");
          setFollowCount(followCount - 1);
        });
    }
  }
  function likeRest() {
    if (likeStatus === "None") {
      axios
        .post(
          `http://localhost:8000/socials/${restaurantID}/like_or_dislike/`,
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
          `http://localhost:8000/socials/${restaurantID}/delete_like_or_dislike/`,
          { headers: authHeader() }
        )
        .then((res) => {
          setLikeCount(likeCount - 1);
          setLikeStatus("None");
        });
    } else {
      axios
        .patch(
          `http://localhost:8000/socials/${restaurantID}/update_like_or_dislike/`,
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
  function dislikeRest() {
    if (likeStatus === "None") {
      axios
        .post(
          `http://localhost:8000/socials/${restaurantID}/like_or_dislike/`,
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
          `http://localhost:8000/socials/${restaurantID}/delete_like_or_dislike/`,
          { headers: authHeader() }
        )
        .then((res) => {
          setDislikeCount(dislikeCount - 1);
          setLikeStatus("None");
        });
    } else {
      axios
        .patch(
          `http://localhost:8000/socials/${restaurantID}/update_like_or_dislike/`,
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
    <header className="bg-dark py-5">
      <div className="container px-4 px-lg-5 my-1">
        <div className="text-center text-white">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 className="display-4 fw-bolder">{props.restaurant}</h1>
            {
              localStorage.getItem("user") && <>
              {followStatus === "Unfollow" || followStatus === "None" ? <>
            <button
                className="btn btn-outline-danger"
                style={{ marginLeft: "30px" }}
                onClick={() => handleFollow()}
              >
                <i className="bi bi-heart"></i>{" "}
                {followStatus === "Unfollow" || followStatus === "None"
                  ? "Follow"
                  : "Unfollow"}
              </button>
            </> : <>
            <button
                className="btn btn-danger"
                style={{ marginLeft: "30px" }}
                onClick={() => handleFollow()}
              >
                <i className="bi bi-heart"></i>{" "}
                {followStatus === "Unfollow" || followStatus === "None"
                  ? "Follow"
                  : "Unfollow"}
              </button>
            </>
            }
              </>
            }
            
            {localStorage.getItem("user") && (
              <>
                {likeStatus === "Like" ? (
                  <>
                    <button
                      style={{ marginLeft: "20px" }}
                      onClick={() => likeRest()}
                      className="btn btn-success"
                    >
                      <i className="bi bi-hand-thumbs-up-fill">
                        {"       " + likeCount}
                      </i>
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => dislikeRest()}
                      className="btn btn-outline-danger"
                    >
                      <i className="bi bi-hand-thumbs-down-fill">
                        {"       " + dislikeCount}
                      </i>
                    </button>
                  </>
                ) : likeStatus === "Dislike" ? (
                  <>
                    <button
                      style={{ marginLeft: "20px" }}
                      onClick={() => likeRest()}
                      className="btn btn-outline-success"
                    >
                      <i className="bi bi-hand-thumbs-up-fill">
                        {"       " + likeCount}
                      </i>
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => dislikeRest()}
                      className="btn btn-danger"
                    >
                      <i className="bi bi-hand-thumbs-down-fill">
                        {"       " + dislikeCount}
                      </i>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => likeRest()}
                      className="btn btn-outline-success"
                      style={{ marginLeft: "20px" }}
                    >
                      <i className="bi bi-hand-thumbs-up-fill">
                        {"       " + likeCount}
                      </i>
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => dislikeRest()}
                      className="btn btn-outline-danger"
                    >
                      <i className="bi bi-hand-thumbs-down-fill">
                        {"       " + dislikeCount}
                      </i>
                    </button>
                  </>
                )}
              </>
            )}
          </div>
          <p className="lead fw-normal text-white-50 mb-0">{props.address}</p>
          <p className="lead fw-normal text-white-50 mb-0">
            {"Followers: " + followCount}
          </p>
        </div>
      </div>
    </header>
  );
};

export default RestaurantProfileHeader;
