import React, { Component } from "react";
import { useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:8000/user/";

const Registration = () => {
    const [avatar, setSelectedFile] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastname] = useState('');
    const [phone_number, setPhone] = useState('');
    const [success, setSuccess] = React.useState(0);
    const [failure, setFailure] = React.useState(0);

    const handleSubmit = (event) => {

        setSuccess(0)
        setFailure(0)
        console.log(event);
        event.preventDefault();
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        let formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('phone_number', phone_number);
        axios.post(API_URL + "register/", formData, config).then((response) => {
            alert("Registered");
            window.location.href = '/login';
            setSuccess(1)
        }, (reponse) => {
            setFailure(1)
        });
    }

    return (
        <>
        <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-1">
          <div className="text-center text-white">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <h1 className="display-4 fw-bolder">Register</h1>
            </div>
          </div>
        </div>
      </header>
            <section className="container px-4 px-lg-5 pt-4" style={{ minHeight: "70vh" }}>
                <form onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" value={last_name} onChange={(e) => setLastname(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" className="form-control" placeholder="Phone Number" value={phone_number} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Profile Picture</label>
                        <input type="file" className="form-control" onChange={(e) => { console.log(e); setSelectedFile(e.target.files[0]) }} />
                    </div>

                    <div>
                        <p id="sucessText" style={{ color: "green", marginLeft: "2em" }}>{success === 1 && (<b> Sucessfully added! </b>)}</p>
                        <p id="sucessText" style={{ color: "red", marginLeft: "2em" }}> {failure === 1 && (<b> Failed to register! </b>)} </p>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                    <br />
                    <p className="forgot-password text-left">
                        Already registered <a href="http://localhost:3000/login/">Sign in?</a>
                    </p>
                </form>
            </section>
        </>
    );
};

export default Registration;