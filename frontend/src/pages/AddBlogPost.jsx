import axios from "axios";
import React from "react";


const AddBlogPost = (props) => {

    const [error, setError] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [content, setContent] = React.useState('');
    const [success, setSuccess] = React.useState(0);
    const [failure, setFailure] = React.useState(0);
    const API_URL = "http://localhost:8000/restaurant/";
    const handleBlogPost = (event) => {

        event.preventDefault();

        let formData = new FormData();
        formData.append('title', title);
        formData.append('short_description', description);
        formData.append('content', content);
        formData.append('restaurant', JSON.parse(localStorage.getItem('restaurant')).id)

        setSuccess(0)
        setFailure(0)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.access) {
            config.headers['Authorization'] = 'Bearer ' + user.access;
            console.log(config)
        }

        axios.post(API_URL + "addBlog/", formData, config).then((response) => {
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
                            <h1 className="display-4 fw-bolder">Add New BlogPost</h1>
                        </div>
                    </div>
                </div>
            </header>
            <section className="container px-4 px-lg-5 pt-4" style={{ minHeight: "70vh" }}>


                <form onSubmit={handleBlogPost}>
                    <div className="form-group mb-2 ml-4 mr-5" >
                        <label for="exampleFormControlInput1"><h4>Blogpost Title</h4></label>
                        <input type="text" className="form-control" placeholder="Enter Name" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    </div>

                    <div className="form-group mb-2 ml-4 mr-5">
                        <label for="exampleFormControlInput1"><h4>Short description</h4></label>
                        <input type="text" className="form-control" placeholder="Enter Name" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                    </div>
                    <div className="form-group mb-2 ml-4 mr-5">
                        <label for="exampleFormControlInput1"><h4>Content</h4></label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" value={content} onChange={(e) => { setContent(e.target.value) }} ></textarea>
                    </div>
                    <div>
                        <p id="sucessText" style={{ color: "green", marginLeft: "2em" }}>{success === 1 && (<b> Sucessfully added! </b>)}</p>
                        <p id="sucessText" style={{ color: "red", marginLeft: "2em" }}> {failure === 1 && (<b> Blogpost failed to add! </b>)} </p>
                    </div>
                    <button type="submit" class="btn btn-primary ml-4">Submit</button>
                    <div style={{ height: "calc(50vh - 34px)" }}> </div>



                </form>
            </section>
        </>
    )
}

export default AddBlogPost;