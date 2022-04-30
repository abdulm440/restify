import axios from "axios";
import React, { useEffect } from "react";
import authHeader from "../services/auth-header";
import $ from 'jquery';

const EditRestaurant = () => {
  const API_URL = "http://localhost:8000/restaurant/";
  const [error, setError] = React.useState('');
  const [name, setName] = React.useState('');
  const [itemname, setItemName] = React.useState('');
  const [itemDes, setItemDes] = React.useState('');
  const [itemtype, setItemType] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [postalCode, setpostalCode] = React.useState('');
  const [price, setitemPrice] = React.useState(0.0);
  const [phoneNumber, setphoneNumber] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState()
    const [preview, setPreview] = React.useState()
  const [image, setImage] = React.useState(null);
  const [type, setType] = React.useState('');
  const [success, setSuccess] = React.useState(0);
  const [failure, setFailure] = React.useState(0);

  const [success1, setSuccess1] = React.useState(0);
  const [failure1, setFailure1] = React.useState(0);

  const [success2, setSuccess2] = React.useState(0);
  const [failure2, setFailure2] = React.useState(0);

  const [resID, setID] = React.useState()

  const [items, setItems] = React.useState([])
  const [images, setImages] = React.useState([])
  const [itemError, setItemError] = React.useState('');

  useEffect(() => {
    refreshStuff();
  }
    , [])

  const refreshStuff = () => {
    if (localStorage.getItem("restaurant") === null) {
      window.location.href = '/addRestaurant'
    }
    else {
      const localRestaurant = JSON.parse(localStorage.getItem('restaurant'));
      axios.get(`http://localhost:8000/restaurant/getRestaurant/${localRestaurant.id}/`, { headers: authHeader() })
        .then(res => {
          console.log(res)
          setImages(res.data.images);
          setItems(res.data.menu);
          setAddress(res.data.address)
          setName(res.data.name)
          setDescription(res.data.description)
          setpostalCode(res.data.postalCode)
          setphoneNumber(res.data.phoneNumber)
          setType(res.data.type)
          setPreview(res.data.logo)
          setID(res.id)
          setSelectedFile(null)

        })
    }
  }

  let first_time = true
  useEffect(() => {
    console.log("CALLED", selectedFile)
    if (!selectedFile && !first_time) {
        setPreview(undefined)
        return
    }
    else if(!selectedFile){
      first_time = false
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])

  const handleRestaurantSubmit = (event) => {

    event.preventDefault();


    let formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('postalCode', postalCode);
    formData.append('phoneNumber', phoneNumber);
    formData.append('description', description);
    if(selectedFile){
    formData.append('logo', selectedFile);
    }
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

    axios.patch(API_URL + "update/"+JSON.parse(localStorage.getItem('restaurant')).id+"/", formData, config).then((response) => {
      console.log("restaurant added")
      console.log(localStorage.getItem("user"))
      setSuccess(1)
      refreshStuff()

    }, (response) => {
      setFailure(1)
    })
  }

  const handleItemSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('name', itemname);
    formData.append('description', itemDes);
    formData.append('price', price);
    formData.append('type', itemtype);
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
      refreshStuff()

      setSuccess1(1)
    }, (response) => {
      setFailure1(1)
    });
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
     refreshStuff()
      setSuccess2(1)
    }, (response) => {
      setFailure2(1)
    });
  }

  return (
    <>
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-1">
          <div className="text-center text-white">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <h1 className="display-4 fw-bolder">Edit Your Restaurant</h1>
            </div>
          </div>
        </div>
      </header>
      <section className="container px-4 px-lg-5 pt-4" style={{ minHeight: "70vh" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "30px" }}>
          <h2 style={{ textAlign: "center" }}>Change Details Below</h2>


        </div>
        <div className="d-flex align-items-start">
          <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">

            <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Edit Details</button>
            <button className="nav-link" id="menu-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Edit Menu</button>

            <button className="nav-link" id="photos-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Edit Photos</button>


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
                

                <label for="exampleFormControlTextarea1"><h4>Restaurant Type</h4></label>
                <select id={"typeInputf"}  class="form-select form-select-lg" aria-label="Default select example">

                      <option selected={type === "IN"} value="IN">Indian</option>
                      <option selected={type === "IT"} value="IT">Italian</option>
                      <option selected={type === "AM"} value="AM">American</option>
                      <option selected={type === "PI"} value="PI">Pizza</option>
                      <option selected={type === "CH"} value="CH">Chinese</option>
                    </select>

                <div className="form-group mt-4">
                  <img src={preview} style={{maxWidth: '100px'}}/>
                  <br></br>
                  <label for="exampleFormControlFile1">Change Restaurant Logo: </label>
                  <input type="file" className="form-control-file" onChange={(e) => { setSelectedFile(e.target.files[0]) }} />
                </div>
                <div>
                  <p id="sucessText" style={{ color: "green" }}>{success === 1 && (<b> Sucessfully updated! </b>)}</p>
                  <p id="sucessText" style={{ color: "red" }}> {failure === 1 && (<b> Restaurant failed to update! </b>)} </p>
                </div>

                <button type="submit" id="restButton" className="btn btn-outline-dark btn-lg mt-3 mb-3" disabled={name === '' || address === '' || postalCode === '' || phoneNumber === '' || description === '' || type === ''}>Update Restaurant</button>
              </form>
            </div>


            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="menu-tab">
              <div className="form-group">
                <form onSubmit={handleItemSubmit}>
                  <div className="form-group mb-2">
                    <label for="exampleFormControlInput1"><h4>Item Name</h4></label>
                    <input type="text" className="form-control" placeholder="Enter Name" value={itemname} onChange={(e) => { setItemName(e.target.value) }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlTextarea1"><h4>Item Description</h4></label>
                    <textarea className="form-control" rows="5" cols="50" placeholder="Enter Description here....." value={itemDes} onChange={(e) => { setItemDes(e.target.value) }}></textarea>
                  </div>
                  <div className="form-group mb-2">
                    <label for="exampleFormControlInput1"><h4>Item Price</h4></label>
                    <input type="number" className="form-control" placeholder="Enter Item Cost" value={price} onChange={(e) => { setitemPrice(e.target.value) }} />
                  </div>
                  <label class="form-check-label" style={{ marginRight: '20px' }}>Item Category: </label>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={itemtype} onChange={(e) => { setItemType("BV") }} />
                    <label class="form-check-label" for="inlineRadio1">Beverage</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={itemtype} onChange={(e) => { setItemType("AP") }} />
                    <label class="form-check-label" for="inlineRadio2">Appetizer</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={itemtype} onChange={(e) => { setItemType("FD") }} />
                    <label class="form-check-label" for="inlineRadio3">Featured Dish</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={itemtype} onChange={(e) => { setItemType("RD") }} />
                    <label class="form-check-label" for="inlineRadio3">Regular Dish</label>
                  </div>
                  <div>
                  </div>
                  <div>
                    <p id="sucessText" style={{ color: "green" }}>{success1 === 1 && (<b> Sucessfully added! </b>)}</p>
                    <p id="sucessText" style={{ color: "red" }}> {failure1 === 1 && (<b> Item failed to add! </b>)} </p>
                  </div>
                  <button type="submit" id="itemButton" className="btn btn-outline-dark btn-lg mt-3 mb-3 mr-4" disabled={name === '' || description === '' || price === '' || type === ''}>Add Menu Item</button>

                </form>
                {items && (
                  <h3 class=""> Menu Items Added:</h3>)}
                {
                  items.map((e) => <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}><div style={{ marginRight: '10px' }}>


                    <p style={{display: 'inline', marginRight: '10px'}}>Name</p>
                    <input id={"nameInputx"+e.id} type="text" className="form-control" placeholder="Enter Name" defaultValue={e.name} style={{ width: '200px', display: 'inline' }} />
                    <p style={{display: 'inline', marginRight: '10px', marginLeft: '10px'}}>Description</p>
                    <input type="text" id={"desInputx"+e.id} className="form-control" placeholder="Enter Description" defaultValue={e.description} style={{ width: '200px', display: "inline" }} /> 
                    <p style={{display: 'inline', marginRight: '10px', marginLeft: '10px'}}>Price</p>
                    <input type="number" id={"priceInputx"+e.id} className="form-control" placeholder="Enter Price" defaultValue={e.price} style={{ width: '80px', display: 'inline' }} />
                    
                    </div><select id={"typeInputx"+e.id} style={{ width: "150px", height: '35px' }} class="form-select form-select-sm" aria-label="Default select example">

                      <option selected={e.type === "BV"} value="BV">Beverage</option>
                      <option selected={e.type === "AP"} value="AP">Appetizer</option>
                      <option selected={e.type === "FD"} value="FD">Featured Dish</option>
                      <option selected={e.type === "RD"} value="RD">Regular Dish</option>
                    </select>
                    <button class="btn-success btn btn-sml" style={{ margin: '10px' }} onClick={() => {
                      let name = document.getElementById("nameInputx"+e.id).value;
                      let description = document.getElementById("desInputx"+e.id).value;
                      let price = document.getElementById("priceInputx"+e.id).value;
                      let type = document.getElementById("typeInputx"+e.id).value;

                      axios.patch("http://localhost:8000/restaurant/updateMenuItem/" + e.id+"/",{name, description, price, type}, { headers: authHeader() }).then((res) => {
                        refreshStuff()
                        setItemError("T"+e.id)
                      }, ()=>{
                        setItemError("F"+e.id)
                      })
                    }}>Update</button>
                    <button class="btn-danger btn btn-sml" style={{ margin: '10px' }} onClick={() => {
                      axios.delete("http://localhost:8000/restaurant/deleteMenuItem/" + e.id, { headers: authHeader() }).then((res) => {
                  
                        refreshStuff()
                      }, ()=>{
                        setItemError("F"+e.id)
                      })
                    }}>Delete</button>
                    {itemError === "T"+e.id && (
                    <p style={{color: 'green', alignSelf: 'center', marginTop: '10px'}}>✓</p>)
}
{itemError === "F"+e.id && (
                    <p style={{color: 'red', alignSelf: 'center', marginTop: '10px'}}>✗</p>)
}
                    </div>)
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

                </form>
              </div>
              <div>
                <p id="sucessText" style={{ color: "green", marginLeft: "2em" }}>{success2 === 1 && (<b> Sucessfully added! </b>)}</p>
                <p id="sucessText" style={{ color: "red", marginLeft: "2em" }}> {failure2 === 1 && (<b> Photo failed to add! </b>)} </p>
              </div>
              {images && (
                <h3 class=""> Images Added:</h3>)}
              {
                images.map((e) => <div style={{margin:'20px'}}><img src={"http://localhost:8000" + e.image} width='150px' /> <button style={{marginleft: '20px'}} class="btn ml-4 btn-danger" onClick={()=>{
                  axios.delete(API_URL+"deletePicture/"+e.id+"/", {headers: authHeader()}).then(()=>{
                    refreshStuff()
                  })
                }}>Delete</button></div>)
              }
            </div>


          </div>
        </div>

      </section>
    </>
  );
};

export default EditRestaurant;
