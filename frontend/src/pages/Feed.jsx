import React, { useEffect } from "react";
import NamedBlogPost from "../components/NamedBlogPost";
import axios from "axios";
import { useState } from "react";
import authHeader from "../services/auth-header";

const Feed = () => {
  const [data, setData] = useState([]);
  const [next, setNext] = React.useState(null);
  const [previous, setPrev] = React.useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/socials/feed/", { headers: authHeader() })
      .then((res) => {
        setData(res.data.results);
        setNext(res.data.next);
        setPrev(res.data.previous);
      });
  }, []);

  const getNext = () => {
    axios.get(next, { headers: authHeader() }).then((response) => {
      setData(response.data.results);
      setNext(response.data.next);
      setPrev(response.data.previous);
    });
  };

  const getPrev = () => {
    axios.get(previous, { headers: authHeader() }).then((response) => {
      setData(response.data.results);
      setNext(response.data.next);
      setPrev(response.data.previous);
    });
  };

  return (
    <>
    <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-1">
          <div className="text-center text-white">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <h1 className="display-4 fw-bolder">Feed</h1>
            </div>
          </div>
        </div>
      </header>
      <section
        className="container px-4 px-lg-5 pt-4"
        style={{ minHeight: "90vh" }}
      >
       
        {
          data.map(post => <NamedBlogPost id={post.id} restaurantID={post.restaurant} title={post.title} content={post.content} date={post.date} restaurant={post.name}/>)
        }
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {previous && (
            <a
              class="btn btn-lg btn-dark mt-auto"
              style={{ color: "white", margin: "20px" }}
              onClick={() => getPrev()}
            >
              Previous Page
            </a>
          )}

          {next && (
            <a
              class="btn btn-lg btn-dark mt-auto"
              style={{ color: "white", margin: "20px", alignSelf: "center" }}
              onClick={() => getNext()}
            >
              Next Page
            </a>
          )}
        </div>
      </section>
    </>
  );
};

export default Feed;
