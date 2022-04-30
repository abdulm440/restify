import axios from "axios";
import React, { useEffect } from "react";
import authHeader from "../services/auth-header";
import $ from 'jquery';

const AddRestaurant = () => {
  const API_URL = "http://localhost:8000/restaurant/";
  const [error, setError] = React.useState('');
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [postalCode, setpostalCode] = React.useState('');
  const [price, setitemPrice] = React.useState(0.0);
  const [phoneNumber, setphoneNumber] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [logo, setLogo] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [type, setType] = React.useState('');
  const [success, setSuccess] = React.useState(0);
  const [failure, setFailure] = React.useState(0);
  const [step, setStep] = React.useState(localStorage.getItem("step") ? parseInt(localStorage.getItem("step")) : 0);
  const [items, setItems] = React.useState([])
  const [images, setImages] = React.useState([])

  useEffect(() => {
    if (step == 1) {
      document.getElementById("menu-tab").click();
    } else if (step == 2) {
      document.getElementById("photos-tab").click();
    } else if (step == 3) {
      document.getElementById("confirm-tab").click();
    }
  }, [])
  const handleRestaurantSubmit = (event) => {

    event.preventDefault();


    let formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('postalCode', postalCode);
    formData.append('phoneNumber', phoneNumber);
    formData.append('description', description);
    formData.append('logo', logo);
    formData.append('type', type);

    setSuccess(0)
    setFailure(0)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.access) {
      console.log("HERE22")
      config.headers['Authorization'] = 'Bearer ' + user.access;
      console.log(config)
    }

    axios.post(API_URL + "add/", formData, config).then((response) => {
      console.log("restaurant added")
      console.log(localStorage.getItem("user"))
      if (localStorage.getItem("user")) {
        console.log("HERE3")
        localStorage.setItem("restaurant", JSON.stringify(response.data));
        localStorage.setItem("step", step + 1);
        setStep(step + 1)
        setName('')
        setDescription('')
        document.getElementById("menu-tab").click();
        setSuccess(0)
        setFailure(0)

      }
      
    }, (response) => {
      setFailure(1)
    });
  }

  const handleItemSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('type', type);
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
      console.log(JSON.parse(localStorage.getItem('restaurant')))
      console.log(JSON.parse(localStorage.getItem('restaurant')).id)
      console.log("HERE22")
      config.headers['Authorization'] = 'Bearer ' + user.access;
      console.log(config)
    }

    axios.post(API_URL + "addMenuItem/", formData, config).then((response) => {
      setItems([...items, response.data])

      setSuccess(1)
    }, (response) => {
      setFailure(1)
    });
  }

  const moveToPhotos = async (e) => {
    e.preventDefault()
    localStorage.setItem("step", 2);
    setStep(2)
    await new Promise(r => setTimeout(r, 100));
    setError('')
    setSuccess(0)
    setFailure(0)
    document.getElementById("photos-tab").click()
  }

  const moveToConfirm = async (e) => {
    e.preventDefault()
    localStorage.setItem("step", 3);
    setStep(3)
    await new Promise(r => setTimeout(r, 100));
    setError('')
    setSuccess(0)
    setFailure(0)
    document.getElementById("confirm-tab").click()
  }

  const handlePhotoSubmit = (event) => {
    event.preventDefault();
    console.log("here")
    let formData = new FormData();
    formData.append('image', image);

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
      console.log("HERE22")
      config.headers['Authorization'] = 'Bearer ' + user.access;
      console.log(config)
    }

    axios.post(API_URL + "addPicture/", formData, config).then((response) => {
      // localStorage.setItem("step", step + 1);
      // setStep(step + 1)
      setImages([...images, response.data])
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
              <h1 className="display-4 fw-bolder">Add New Restaurant</h1>
            </div>
          </div>
        </div>
      </header>
      <section className="container px-4 px-lg-5 pt-4" style={{ minHeight: "70vh" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "30px" }}>
          <h2 style={{ textAlign: "center" }}>Fill Out Details Below</h2>


        </div>
        <div className="d-flex align-items-start">
          <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">

            <button className="nav-link active" disabled={step !== 0} id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Step 1: <br />Add Restaurant</button>
            {step >= 1 &&
              (<button className="nav-link" disabled={step !== 1} id="menu-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Step 2: <br />Add Menu Item</button>
              )}
            {step >= 2 &&
              (<button className="nav-link" disabled={step !== 2} id="photos-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Step 3: <br />Add Photos</button>
              )}
            {step >= 3 &&
              (<button className="nav-link" disabled={step !== 3} id="confirm-tab" data-bs-toggle="pill" data-bs-target="#v-pills-confirm" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Step 4: <br />View Restaurant Profile</button>
              )}
          </div>
          <div className="tab-content" id="v-pills-tabContent">
            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
              <form onSubmit={handleRestaurantSubmit}>
                <div className="form-group mb-2">
                  <label for="exampleFormControlInput1"><h4>Restaurant Name</h4></label>
                  <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className="form-group mb-2">
                  <label for="exampleFormControlInput1"><h4>Restaurant Address</h4></label>
                  <input type="text" className="form-control" placeholder="Enter Address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                </div>
                <div className="form-group mb-2">
                  <label for="exampleFormControlInput1"><h4>Restaurant Postal Code</h4></label>
                  <input type="text" className="form-control" placeholder="Enter Postal Code" value={postalCode} onChange={(e) => { setpostalCode(e.target.value) }} />
                </div>
                <div className="form-group mb-2">
                  <label for="exampleFormControlInput1"><h4>Restaurant Phone Number</h4></label>
                  <input type="text" className="form-control" placeholder="Enter Number" value={phoneNumber} onChange={(e) => { setphoneNumber(e.target.value) }} />
                </div>
                <div className="form-group">
                  <label for="exampleFormControlTextarea1"><h4>Restaurant Description</h4></label>
                  <textarea className="form-control" rows="10" cols="140" placeholder="Enter Description here....." value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                </div>
                <div className="form-group">
                  <label class="form-check-label" style={{ marginRight: '10px' }}>Cuisine Type:</label>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={type} onChange={(e) => { setType("IN") }} />
                    <label class="form-check-label" for="inlineRadio1">Indian</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={type} onChange={(e) => { setType("IT") }} />
                    <label class="form-check-label" for="inlineRadio2">Italian</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={type} onChange={(e) => { setType("AM") }} />
                    <label class="form-check-label" for="inlineRadio3">American</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={type} onChange={(e) => { setType("PI") }} />
                    <label class="form-check-label" for="inlineRadio3">Pizza</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={type} onChange={(e) => { setType("CH") }} />
                    <label class="form-check-label" for="inlineRadio3">Chinese</label>
                  </div>
                  
                </div>

                <div className="form-group mt-4">
                  <label for="exampleFormControlFile1">Upload Restaurant Logo: </label>
                  <input type="file" className="form-control-file" onChange={(e) => { setLogo(e.target.files[0]) }} />
                </div>
                <div>
                  <p id="sucessText" style={{ color: "green" }}>{success === 1 && (<b> Sucessfully added! </b>)}</p>
                  <p id="sucessText" style={{ color: "red" }}> {failure === 1 && (<b> Restaurant failed to add! </b>)} </p>
                </div>

                <button type="submit" id="restButton" className="btn btn-outline-dark btn-lg mt-3 mb-3" disabled={name === '' || address === '' || postalCode === '' || phoneNumber === '' || description === '' || type === '' || logo === null}>Add Restaurant</button>
              </form>
            </div>


            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="menu-tab">
              <div className="form-group">
                <form onSubmit={handleItemSubmit}>
                  <div className="form-group mb-2">
                    <label for="exampleFormControlInput1"><h4>Item Name</h4></label>
                    <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlTextarea1"><h4>Item Description</h4></label>
                    <textarea className="form-control" rows="5" cols="50" placeholder="Enter Description here....." value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                  </div>
                  <div className="form-group mb-2">
                    <label for="exampleFormControlInput1"><h4>Item Price</h4></label>
                    <input type="number" className="form-control" placeholder="Enter Item Cost" value={price} onChange={(e) => { setitemPrice(e.target.value) }} />
                  </div>
                  <label class="form-check-label" style={{ marginRight: '20px' }}>Item Category: </label>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={type} onChange={(e) => { setType("BV") }} />
                    <label class="form-check-label" for="inlineRadio1">Beverage</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={type} onChange={(e) => { setType("AP") }} />
                    <label class="form-check-label" for="inlineRadio2">Appetizer</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={type} onChange={(e) => { setType("FD") }} />
                    <label class="form-check-label" for="inlineRadio3">Featured Dish</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={type} onChange={(e) => { setType("RD") }} />
                    <label class="form-check-label" for="inlineRadio3">Regular Dish</label>
                  </div>
                  <div>
                  </div>
                  <div>
                    <p id="sucessText" style={{ color: "green" }}>{success === 1 && (<b> Sucessfully added! </b>)}</p>
                    <p id="sucessText" style={{ color: "red" }}> {failure === 1 && (<b> Item failed to add! </b>)} </p>
                  </div>
                  <button type="submit" id="itemButton" className="btn btn-outline-dark btn-lg mt-3 mb-3 mr-4" disabled={name === '' || description === '' || price === '' || type === ''}>Add Menu Item</button>
                  <button onClick={(e) => moveToPhotos(e)} className="btn btn-outline-dark btn-lg mt-3 mb-3">Skip to Next Step</button>
                </form>
                {items && (
                <h3 class=""> Menu Items Added:</h3>)}
                {
                  items.map((e)=><div>Name: {e.name}, Description: {e.description}, Price: ${e.price}</div>)
                }
              </div>
            </div>


            <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="messages-tab"><h4>Upload a Photo</h4>
              <div className="form-group">
                <form onSubmit={handlePhotoSubmit}>
                  <div className="input-group mt-4">
                    <input class="form-control form-control-lg" id="formFileLg" type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
                  </div>
                  <button type="submit" id="photoButton" className="btn btn-outline-dark btn-lg mt-3 mb-3 mr-4">Add New Photo</button>
                  <button className="btn btn-outline-dark btn-lg mt-3 mb-3" onClick={(e)=>moveToConfirm(e)}>Skip to Next Step</button>
                </form>
              </div>
              <div>
                <p id="sucessText" style={{ color: "green", marginLeft: "2em" }}>{success === 1 && (<b> Sucessfully added! </b>)}</p>
                <p id="sucessText" style={{ color: "red", marginLeft: "2em" }}> {failure === 1 && (<b> Photo failed to add! </b>)} </p>
              </div>
              {images && (
                <h3 class=""> Images Added:</h3>)}
                {
                  images.map((e)=><img src={e.image} width='100px'/>)
                }
            </div>

            <div className="tab-pane fade" id="v-pills-confirm" role="tabpanel" aria-labelledby="confirm-tab"><h4>Lets view your newly created Restaurant!</h4>
              <a className="btn btn-dark btn-lg mt-3" style={{color: 'white'}} href={"/myRestaurant"}>View My Restaurant</a>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default AddRestaurant;
