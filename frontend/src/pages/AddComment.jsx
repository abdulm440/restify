import axios from "axios";
import React from "react";


const AddComment = (props) => {

    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [success, setSuccess] = React.useState(0);
    const [failure, setFailure] = React.useState(0);
    const API_URL = "http://localhost:8000/socials/";

    const handleComment = (event) => {

        event.preventDefault();
        const rest = JSON.parse(localStorage.getItem('restaurant'))

        setSuccess(0)
        setFailure(0)
        const config = {
            headers: {},
        };

        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.access) {
            config.headers['Authorization'] = 'Bearer ' + user.access;
            console.log(config)
        }

        axios.post(API_URL + rest.id+"/comment/", {title,content}, config).then((response) => {
            console.log(document.getElementById('successText'))
            setSuccess(1)

        }, (response) => {
            setFailure(1)
        });
    }


    return (
        <>
        <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-1">
          <div className="text-center text-white">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <h1 className="display-4 fw-bolder">Add New Comment</h1>
            </div>
          </div>
        </div>
      </header>
       
        <form onSubmit={handleComment}>
            <div className="form-group mb-2 ml-4 mr-5 mt-1">
                <label for="exampleFormControlInput1"><h4>Title</h4></label>
                <input type="text" className="form-control" placeholder="Enter Name" value={title} onChange={(e) => { setTitle(e.target.value) }} />
            </div>
            <div className="form-group mb-2 ml-4 mr-5">
                <label for="exampleFormControlInput1"><h4>Content</h4></label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={content} onChange={(e) => { setContent(e.target.value) }} ></textarea>
            </div>
            <div>
                <p id="sucessText" style={{color:"green",marginLeft:"2em"}}>{success===1&&(<b> Sucessfully added! </b>)}</p>
                <p id="sucessText" style={{color:"red",marginLeft:"2em"}}> {failure===1&&(<b> Comment failed to add! </b>)} </p>
            </div>
            <button type="submit" class="btn btn-primary ml-4">Submit</button>
        </form>
        </>
    )
}

export default AddComment;