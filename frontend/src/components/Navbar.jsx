import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import authService from '../services/auth.service';
import axios from 'axios';
import authHeader from '../services/auth-header';

const Navbar = () => {

    const [first, setFirst] = React.useState('');
    const [preview, setPreview] = React.useState(null);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [notifs, setNotifs] = React.useState([]);
    useEffect(() => {
        setLoggedIn(authService.getCurrentUser() !== null)
        if (authService.getCurrentUser() !== null) {
            axios.get("http://localhost:8000/user/get/", { headers: authHeader() }).then((response) => {
                setFirst(response.data.first_name)

                setPreview(response.data.avatar);

            })

            axios.get("http://localhost:8000/restaurant/user/", { headers: authHeader() }).then((response) => {
            localStorage.setItem("restaurant", JSON.stringify(response.data[0]));

          
        })
        axios.get("http://localhost:8000/socials/notifs/", { headers: authHeader() }).then((response) => {
            setNotifs(response.data.results)
        })
    }
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="/">Restify</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {loggedIn && (
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>

                            <li className="nav-item dropdown"><a className="nav-link dropdown-toggle" id="navbarDropdown2" href="/myRestaurant"
                                role="button" data-bs-toggle="dropdown" aria-expanded="false">My Restaurant</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                {localStorage.getItem("restaurant") &&
                                    (<li><a className="dropdown-item" href="/myRestaurant">View Restaurant</a></li>)
}
                                    {localStorage.getItem("restaurant") &&
                                   (<li><a className="dropdown-item" href="/addBlogPost/">Add Blog Post</a></li>)}
                                    {localStorage.getItem("restaurant") &&
                                   (<li><a className="dropdown-item" href="/editRestaurant">Edit Restaurant</a></li>)}
                                    {localStorage.getItem("restaurant")===null &&
                                    (<li><a className="dropdown-item" href="/addRestaurant">Add Restaurant</a></li>)
                                    }
                                </ul>
                            </li>
                            <li className="nav-item"><a className="nav-link" href="/feed">Feed</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown2" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">Notifications</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown2" style={{paddingBottom: 0, borderRadius: '0 0 5px 5px'}}>
                                    {
                                        notifs.length === 0 && (<li><a style={{marginBottom: '8px'}} className="dropdown-item" href="#">No new notifications!</a></li>)
                                    }
                                    {
                                        notifs.map((e)=> <li><a className="dropdown-item" href="/notifs">{e.text.length > 40 ? e.text.substring(0, 37) + "..." : e.text}</a></li>)
                                    }
                                    {
                                        notifs.length !== 0 && (<li><a  className="dropdown-item bg-primary text-light" style={{textAlign: 'center'}} href="/notifs">View All Notifications</a></li>)
                                    }
                                    
                                </ul>
                            </li>


                        </ul>
                    )}

                    {!loggedIn && (
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>
                            <li className="nav-item"><a className="nav-link active" aria-current="page" href="/register">Register</a></li>
                            <li className="nav-item"><a className="nav-link active" aria-current="page" href="/login">Login</a></li>


                        </ul>
                    )}
                    {loggedIn && (
                        <div className="nav-item dropdown ">

                            <a className="btn dropdown-toggle btn-outline-dark" id="navbarDropdown" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">My Account </a>
                            <div className="dropdown-menu px-4" aria-labelledby="navbarDropdown" style={{ width: "200px" }}>
                                <img className="img-thumbnail rounded-circle mb-2 mx-auto d-block" src={preview} alt=""
                                    style={{ width: "30%" }} />
                                <p style={{ textAlign: "center" }}>Logged In As {first}</p>
                                <a className="btn btn-outline-primary mb-2" href="/profile" style={{ width: "100%" }}>Edit
                                    Profile</a>
                                <a className="btn btn-outline-danger " href="/" style={{ width: "100%" }} onClick={() => { authService.logout() }}>Logout</a>
                            </div>
                        </div>)
                    }


                </div>
            </div>
        </nav>
    )
}

export default Navbar;