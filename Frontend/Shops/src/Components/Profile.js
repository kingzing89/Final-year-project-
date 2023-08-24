import React from 'react'
import Card from './Card'
import Navbar from './Navbar2'
import { useContext } from 'react'
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import ShopContext from '../context/meds/Shopcontext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Medcard from './Medcard'
import {

  MDBContainer,

  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
function Profile() {
  const context = useContext(ShopContext);
  const { getShops, shops , setShops } = context;
  let history = useNavigate();

  useEffect(() => {
    
    if (localStorage.getItem("token")) {
      getShops();


    }
    else {
      history("/");

    }


  }, [])
 

  return (
    
    <div>
    
      
      
          
       
              <MDBRow >
                <MDBCol md='3'className='g-col-6 ' >
              
                <Card name={shops.shopname} address={shops.shopaddress} city={shops.city} phone={shops.phone} image={shops.myFile} />
                <MDBCard className="mb-4 ms-5">
              
            </MDBCard>
                </MDBCol>
                
              
          
                <MDBCol md='7' className=' mt-5 text-black d-flex justify-content-center' >
                <Medcard />
                </MDBCol>
                
              </MDBRow>

              
              
         



          
        



</div>
  );


  











}

export default Profile