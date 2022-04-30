import React, { useEffect } from "react";
import BlogPost from "../components/BlogPost";
import Menu from "../components/Menu";
import Photos from "../components/Photos";
import RestaurantProfileHeader from "../components/RestaurantProfileHeader";
import Comment from "../components/Comment";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";

const RestaurantProfile = (props) => {

  const params = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [success, setSuccess] = React.useState(0);
  const [failure, setFailure] = React.useState(0);

  const [dummy, setDummy] = React.useState(0);
  const API_URL = "http://localhost:8000/socials/";
  const isMyRest = document.location.href.search("myRestaurant") !== -1 || (localStorage.getItem('restaurant') && params.id ==JSON.parse(localStorage.getItem('restaurant')).id)
  
  const handleComment = (event) => {

    event.preventDefault();
    const rest = JSON.parse(localStorage.getItem('restaurant'))
   
    setSuccess(0)
    setFailure(0)
    setDummy(0)
    const config = {
      headers: {},
    };

    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.access) {
      config.headers['Authorization'] = 'Bearer ' + user.access;
      console.log(config)
    }

    axios.post(API_URL + rest.id + "/comment/", { title, content }, config).then((response) => {
      console.log(document.getElementById('successText'))
      setSuccess(1)
      setDummy(1)
      refresh()
    }, (response) => {
      setFailure(1)
    });
  }

  useEffect(() => {
    if (params.id) {
      axios.get(`http://localhost:8000/restaurant/getRestaurant/${params.id}`, { headers: authHeader() })
        .then(res => { setData(res.data); setLoading(false); })
    }
    else {
      const localRestaurant = JSON.parse(localStorage.getItem('restaurant'));
      axios.get(`http://localhost:8000/restaurant/getRestaurant/${localRestaurant.id}/`, { headers: authHeader() })
        .then(res => { setData(res.data); setLoading(false); })
    }
  }, [params.id]);

  const refresh = () =>{
    if (params.id) {
      axios.get(`http://localhost:8000/restaurant/getRestaurant/${params.id}`, { headers: authHeader() })
        .then(res => { setData(res.data); setLoading(false); })
    }
    else {
      const localRestaurant = JSON.parse(localStorage.getItem('restaurant'));
      axios.get(`http://localhost:8000/restaurant/getRestaurant/${localRestaurant.id}/`, { headers: authHeader() })
        .then(res => { setData(res.data); setLoading(false); })
    }
  }
  if (loading) {
    return <span>Loading...</span>
  }


  return (
    <>
      <RestaurantProfileHeader
        restaurant={data.name}
        address={data.address + ", " + data.postalCode}
        restaurantID={data.id}
      />
      <section className="container px-4 px-lg-5 pt-4" style={{ minHeight: "70vh" }}>
        <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              General Information
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Menu
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="photos-tab"
              data-bs-toggle="tab"
              data-bs-target="#photos"
              type="button"
              role="tab"
              aria-controls="photos"
              aria-selected="false"
            >
              Photos
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="blog-tab"
              data-bs-toggle="tab"
              data-bs-target="#blog"
              type="button"
              role="tab"
              aria-controls="blog"
              aria-selected="false"
            >
              Blog
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="comments-tab"
              data-bs-toggle="tab"
              data-bs-target="#comments"
              type="button"
              role="tab"
              aria-controls="comments"
              aria-selected="false"
            >
              Comments
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
            style={{ marginLeft: "2em", marginRight: "2em", marginTop: "2em" }}
          >

            <div style={{ alignItems: "center" }}>
              <img
                src={data.logo}
                style={{ alignSelf: "center", width: "40%" }}
                className=" p-4 rounded-circle mx-auto d-block"
              />
              <div>
                <h5 className="display-5" style={{ textAlign: "center" }}>
                  About {data.name}
                </h5>
                <p style={{ textAlign: "center" }}>{data.description}</p>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade p-5"
            id="photos"
            role="tabpanel"
            aria-labelledby="photos-tab"

          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Photos style={{ display: 'flex', justifyContent: 'center' }} logo={data.logo} assetURLs={data.images} />
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <section id="price">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="block">
                      <h1
                        className="heading wow fadeInUp"
                        data-wow-duration="300ms"
                        data-wow-delay="300ms"
                        style={{ marginTop: '20px' }}
                      >
                        <span style={{ fontFamily: "Play", marginLeft: '30%', marginRight: '20%', marginTop: '100px', fontSize: '1.5em', textAlign: 'center' }}>{data.name}'s Menu</span>
                      </h1>
                      <div className="pricing-list">

                        <Menu menu={data.menu} />
                        <a
                          className="btn ml-7 btn-outline-dark pull-right wow bounceIn"
                          data-wow-duration="500ms"
                          data-wow-delay="1200ms"
                          href="#"
                          role="button"
                          style={{ marginLeft: '25px', marginBottom: '25px' }}
                        >
                          Back to top
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div
            className="tab-pane fade"
            id="blog"
            role="tabpanel"
            aria-labelledby="blog-tab"
          >
            <h2 className="display-5" style={{ marginTop: "20px", textAlign: "center" }}>
              Latest Updates
            </h2>
            {isMyRest && (
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <a class= 'btn-lg btn btn-outline-dark' href='/addBlogPost'>Add Blog Posts</a>
            
            </div>)
            }
            { 
              [data.blog_posts.map(post => <BlogPost title={post.title} content={post.content} id={post.id} likeStatus={post.like_status} myRest={isMyRest} refresh={refresh}/>)]
            }
          </div>
          <div
            className="tab-pane fade p-5"
            id="comments"
            role="tabpanel"
            aria-labelledby="comments-tab"
          >
            <div className="container">
              {localStorage.getItem("user") &&
              (<form onSubmit={handleComment}>
                <div className="form-group mb-2 ml-4 mr-5 mt-1">
                  <h1 style={{color:"#0C6EFD"}}>Add new Comment</h1>
                  <label for="exampleFormControlInput1"><h4>Title</h4></label>
                  <input type="text" className="form-control" placeholder="Enter Name" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </div>
                <div className="form-group mb-2 ml-4 mr-5">
                  <label for="exampleFormControlInput1"><h4>Body</h4></label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={content} onChange={(e) => { setContent(e.target.value) }} ></textarea>
                </div>
                <div>
                  <p id="sucessText" style={{ color: "green", marginLeft: "2em" }}>{success === 1 && (<b> Sucessfully added! </b>)}</p>
                  <p id="sucessText" style={{ color: "red", marginLeft: "2em" }}> {failure === 1 && (<b> Comment failed to add! </b>)} </p>
                </div>
                <button type="submit" class="btn btn-primary ml-4 mb-5">Submit</button>
                
              </form>)}
              {setDummy &&
               [data.comments.map(comment => <Comment title={comment.title} content={comment.content} name={comment.name} date={comment.date} />) ]
                
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RestaurantProfile;
