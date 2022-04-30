import axios from "axios";
import React, { useEffect } from "react";
import authHeader from "../services/auth-header";
import $ from 'jquery';
import authService from "../services/auth.service";

const Notifs = () => {
 const [next, setNext] = React.useState(null)
 const [previous, setPrev] = React.useState(null)
 const [notifs, setNotifs] = React.useState([])

 useEffect(() => {
    if (authService.getCurrentUser() !== null) {
    axios.get("http://localhost:8000/socials/notifs/", { headers: authHeader() }).then((response) => {
        setNotifs(response.data.results)
        setNext(response.data.next)
        setPrev(response.data.previous)
    })
}
}, [])

const getNext = () =>{
    axios.get(next, { headers: authHeader() }).then((response)=>{
      setNotifs(response.data.results)
      setNext(response.data.next)
      setPrev(response.data.previous)
    })
   }
  
   const getPrev = () =>{
    axios.get(previous, { headers: authHeader() }).then((response)=>{
      setNotifs(response.data.results)
      setNext(response.data.next)
      setPrev(response.data.previous)
    })
   }

  return (
    <>
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-1">
          <div className="text-center text-white">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <h1 className="display-4 fw-bolder">Notifications</h1>
            </div>
          </div>
        </div>
      </header>
      <section className="container px-4 px-lg-5 pt-4" style={{ minHeight: "70vh" }}>
          {
              notifs.map((e)=><div>
                  
                  <div style={{display: 'flex', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center'}}>
                  <h4>{e.date.substring(0,10) + " "}{e.date.substring(11,19)+ "  "}    </h4> <h3 style={{marginLeft: '20px'}}>{"   " +e.text}</h3>
              </div>
              </div>)
          }
       
       <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
      {previous && (<a class="btn btn-lg btn-dark mt-auto" style={{color: "white",  margin: '20px'}} onClick={()=>getPrev()}>Previous Page</a>)}
          
          {next && (
          <a class="btn btn-lg btn-dark mt-auto" style={{color: "white", margin: '20px', alignSelf: 'center'}} onClick={()=>getNext()}>Next Page</a>)
            }
            </div>
      </section>
    </>
  );
};

export default Notifs;
