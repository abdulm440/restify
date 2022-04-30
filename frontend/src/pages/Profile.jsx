import React from "react";
import ProfileDetails from "../components/ProfileDetails";
import ProfilePictureCard from "../components/ProfilePictureCard";
import axios from 'axios'
import { useEffect } from 'react'
import authHeader from '../services/auth-header'

const API_URL = "http://localhost:8000/user/";

const Profile = () => {
  const [first_name, setFirst] = React.useState('');
    const [last_name, setLast] = React.useState('');
    const [password, setPass] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [selectedFile, setSelectedFile] = React.useState()
    const [preview, setPreview] = React.useState()

    useEffect(()=>{
        axios.get("http://localhost:8000/user/get/", {headers: authHeader()}).then((response)=>{
            setFirst(response.data.first_name)
            setLast(response.data.last_name);
            setPhone(response.data.phone_number)
            setPreview(response.data.avatar);
            setEmail(response.data.email)
        })
    },
    [])

    useEffect(() => {
      if (!selectedFile) {
          setPreview(undefined)
          return
      }
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const handleSubmit = (event) =>{
    console.log(event);
            event.preventDefault();
            const config = {
              headers: {
                'content-type': 'multipart/form-data',
              },
            };
          
            const user = JSON.parse(localStorage.getItem('user'));
              if (user && user.access) {
                console.log("HERE22")
                config.headers['Authorization'] = 'Bearer ' + user.access ;
                console.log(config)
              }
            let formData = new FormData();
            if(selectedFile){
            formData.append('avatar', selectedFile);
            }
            
            if(password){
            formData.append('password', password);
            }
            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('phone_number', phone);
            axios.put(API_URL + "update/", formData, config).then((response)=>{
                console.log(response)
                document.location.reload()
            }, (reponse)=>{
                console.log("Error")
            });
  }

  const onSelectFile = e => {
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined)
          return
      }
      setSelectedFile(e.target.files[0])
  }


  return (
    <div class="container-xl px-4 mt-4" style={{ minHeight: "85vh" }}>
      <h1 class="display-5" style={{textAlign: 'center', marginBottom: '20px'}}>User Profile for {email}</h1>
      <div className="row">
      <div class="col-xl-4">
      <div className="card mb-4 mb-xl-0">
        <div className="card-header">Profile Picture</div>
        <div className="card-body text-center">
          <img
            className="img-account-profile rounded-circle mb-2"
            src={preview}
            alt=""
            style={{maxWidth: '200px'}}
          />
          <div className="small font-italic text-muted mb-4">
            JPG or PNG no larger than 5 MB
          </div>
          <input type="file" className="form-control"  placeholder="Empty"  onChange={onSelectFile}/>
        </div>
      </div>
    </div>
    <div className="col-xl-8">
                <div className="card mb-4">
                    <div className="card-header">Account Details</div>
                    <div className="card-body">
                        <form>
                        

                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1" for="inputFirstName">First name</label>
                                    <input className="form-control" id="inputFirstName" type="text"
                                        placeholder="Enter your first name" value={first_name} onChange={(e)=>setFirst(e.target.value)}/>
                                </div>
                                <div className="col-md-6">
                                    <label className="small mb-1" for="inputLastName">Last name</label>
                                    <input className="form-control" id="inputLastName" type="text"
                                        placeholder="Enter your last name" value={last_name} onChange={(e)=>setLast(e.target.value)} />
                                </div>
                            </div>
                            
                           
                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1" for="inputPhone">Phone number</label>
                                    <input className="form-control" id="inputPhone" type="tel"
                                        placeholder="Enter your phone number" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="small mb-1" for="inputPass">Password</label>
                                    <input className="form-control" id="inputPass" type="password"
                                        placeholder="Enter a new password" value={password} onChange={(e)=>setPass(e.target.value)}/>
                                </div>
                                
                            </div>
                            <button className="btn btn-primary" type="button" onClick={(e)=>{handleSubmit(e)}}>Save changes</button>
                        </form>
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
};

export default Profile;
