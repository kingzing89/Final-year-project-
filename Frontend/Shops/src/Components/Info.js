import e from 'cors';
import React, { createContext } from 'react'
import { useContext, useState } from 'react';
import "../Styles/shopinfo.css";
import ShopContext from '../context/meds/Shopcontext';
import Shopstate from '../context/meds/Shopstate';
import axios from 'axios';





import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export default function Info() {
  const navigate = useNavigate();

  const [ownername, setOwner] = useState("");
  const [shopname, setShopName] = useState("");
  const [phone, setPhone] = useState("");
  
  const [shopaddress, setShopAddress] = useState("");
  const [City, setCity] = useState("");
  const [file, setFile] = useState("");
  const [file2, setFile2] = useState("");

  var random = "random";
  const context = useContext(ShopContext);
  const { addShops } = context;

  const handleChange = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files[0]);
    console.log(file.length);

    
  }

  const handleChange2 = (e) => {
    setFile2(e.target.files[0])
    console.log(e.target.files[0]);
    console.log(file.length);

  }

  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('Image', file);
    formData.append('Image2',file2)
    console.log(formData);

    axios.post("http://localhost:5000/upload", formData , {
      
   
        
        
      
    })
      .then((response) => {
        console.log(typeof response.data.Image[0].filename);
        addShops(ownername,shopname,phone,shopaddress, City, response.data.Image[0].filename,response.data.Image2[0].filename);
        navigate("/profile");
       
        
      }).catch((error) => {
        console.log(error);

      });



      
      
      

    };

    

   


      
  










  return (

    <div className="rm-background card-info layout" >
      <h2 className='bar'>
        Shop Approval Form

      </h2>
      <div className='container pt-0 pr-0 '>
        <div className='row justify-content-center'>
          <div className='col-xs-12 col-sm-10 col-md-8 col-lg-5'>
            <form onSubmit={handleSubmit}>
              <div className='form-group mt-3'>

                <small className="text-body-secondary text-light ">Owner Name</small>

                <input type='text' className='form-control  ' placeholder='Owner Name' value={ownername} onChange={(e) => setOwner(e.target.value)} />
                <Form.Text id="passwordHelpBlock" muted>
                  <b>Your password must be 8-20 characters long, contain letters and numbers,
                    and must not contain spaces, special characters, or emoji.</b>
                </Form.Text>
              </div>
              <div className='form-group mt-3'>
                <label htmlFor=''className='text-light'>Shop Name</label>
                <span className="currencyinput"><input type="text" className='form-control value' name="currency" placeholder='Shop Name' value={shopname} onChange={(e) => setShopName(e.target.value)} /></span>

              </div>
              <div className='form-group mt-3'>
                <label htmlFor='' className='text-light'>Phone</label>
                <input type='text' className='form-control' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
             


              <div className='form-group mt-3'>
                <label htmlFor='' className='text-light'>Shop Address</label>
                <input type='text' className='mb-3 mt  ml-3 mr-3 form-control' placeholder='Shop Address' value={shopaddress} onChange={(e) => setShopAddress(e.target.value)} />
              </div>
              
              <div className='form-group mt-3'>
                <label htmlFor='' className='text-light'>City</label>
                <input type='text' className='mb-3  ml-3 mr-3 form-control' placeholder='Enter City' value={City} onChange={(e) => setCity(e.target.value)} />
              </div>
              <label htmlFor='file-upload' >* Upload Profile Image</label>
              <input type="file" id='file-upload' name="Image" onChange={handleChange} />

              <label htmlFor='file-upload2' >* Upload License Image</label>
              <input type="file" id='file-upload2' name="Image2" onChange={handleChange2} />
              
              <button className='btn btn-success mt-5 mb-5 form-control'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>




















    </div>
  )
}
