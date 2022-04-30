import React from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import $ from 'jquery';
import RestaurantCard from "../components/RestaurantCard";
import axios from "axios";
import authHeader from "../services/auth-header";

const SearchResults = () => {

  const [restaurants, setRest] = React.useState([]);
  const [next, hasNext] = React.useState(null)
  const [prev, hasPrev] = React.useState(null)
  const params = useParams();
  useEffect(() => {
    axios.get("http://localhost:8000/restaurant/list?keyword="+params.name, { headers: authHeader() }).then((response)=>{
      setRest(response.data.results)
      hasNext(response.data.next)
      hasPrev(response.data.previous)
    })
  }, [])

 const getNext = () =>{
  axios.get(next, { headers: authHeader() }).then((response)=>{
    setRest(response.data.results)
    hasNext(response.data.next)
    hasPrev(response.data.previous)
  })
 }

 const getPrev = () =>{
  axios.get(prev, { headers: authHeader() }).then((response)=>{
    setRest(response.data.results)
    hasNext(response.data.next)
    hasPrev(response.data.previous)
  })
 }
  return (
    <>
      <Header isHome={false} />
      <h1 style={{textAlign: 'center', marginTop: '20px'}}>Search Results for '{params.name}'</h1>
      <div class="container">
        <div class="row">

          <div>
            <section class="py-5">
            
              <div class="container px-4 px-lg-5 mt-5">
                
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-5 justify-content-center">


                {restaurants.map((rest)=><RestaurantCard name={rest.name} id={rest.id} image={rest.logo} type={rest.type} post={rest.postalCode}/>)}
              </div>
          </div>
          <div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
           {prev && (<a class="btn btn-lg btn-dark mt-auto" style={{color: "white",  margin: '20px'}} onClick={()=>getPrev()}>Previous Page</a>)}
          
          {next && (
          <a class="btn btn-lg btn-dark mt-auto" style={{color: "white", margin: '20px'}} onClick={()=>getNext()}>Next Page</a>)
            }
          </div>
        </section>
      </div>
    </div>
          </div >

      
      </>
      );
};

export default SearchResults;
