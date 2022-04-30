import axios from "axios";
import React, { Component } from "react";
import authHeader from "../services/auth-header";
import authService from "../services/auth.service";
const Login = () => {
  const API_URL = "http://localhost:8000/user/";

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    axios
      .post(API_URL + "login/", {
        email,
        password
      })
      .then(response => {
        if (response.data.access) {
          console.log("HERE")
          localStorage.setItem("user", JSON.stringify(response.data));
          axios.get("http://localhost:8000/restaurant/user/", { headers: authHeader() }).then((response) => {
            localStorage.setItem("restaurant", JSON.stringify(response.data.get(0)));
            console.log(response.data.get(0), "HJKKJ")
          })

          window.location.href = '/';
        }

      }, (response) => {
        setError('Your username and password don\'t match')
      });
  }
  return (
    <>
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-1">
          <div className="text-center text-white">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <h1 className="display-4 fw-bolder">Login</h1>
            </div>
          </div>
        </div>
      </header>

      <section className="container px-4 px-lg-5 pt-4" style={{ minHeight: "70vh" }}>
        <form onSubmit={handleSubmit}>
          <h3>Log In</h3>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </div>

          <button type="submit" className="btn btn-primary">Login</button>

        </form>

        <div style={{ color: 'red' }}>{error}</div>
        <div style={{ height: "calc(100% - 34px)" }}> </div>

      </section>
    </>
  );
};
export default Login;