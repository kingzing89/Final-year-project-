import React, { useState } from 'react'

import { useEffect } from 'react';

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import AlertDismissibleExample from './AlertDismissibleExample';










export default function Order() {
  let total = 0;
  const [orders, setorder] = useState([])





  async function fetchorder() {
   
    const response = await fetch("http://localhost:5000/api/nextorder/getorder", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")

      },


    })

    const json = await response.json();
    setorder(orders.concat(json))



  }

  

  useEffect(() => {

    setInterval(fetchorder,200);
    
  

   




  }, [])

  const sum = () => {
    for( let i=0;i<orders.length;i++){
      total=total+orders[i].price;
      
    }
   if(total==0){
    return 0
   }
    return total;
   
  }

  return (
    <>
      <section className="h-100" style={{ backgroundColor: "#fdccbc" }}>
        <MDBContainer className="h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol>
              <p>
                <span className="h2">Orders</span>

              </p>
              {orders.length>0?orders.map((user) => {
                return (


                  <MDBCard className="mb-4">
                    <MDBCardBody className="p-4">
                      <MDBRow className="align-items-center">

                        <MDBCol md="2" className="d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">Name</p>
                            <p className="lead fw-normal mb-0">{user.medicinename}</p>
                          </div>
                        </MDBCol>
                        <MDBCol md="2" className="d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">Address</p>
                            <p className="lead fw-normal mb-0">{user.deliveryaddress}</p>
                          </div>
                        </MDBCol>
                        <MDBCol md="2" className="d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">Size</p>
                            <p className="lead fw-normal mb-0">
                              <MDBIcon
                                fas
                                icon="circle me-2"
                                style={{ color: "#fdd8d2" }}
                              />
                              {user.size}
                            </p>
                          </div>
                        </MDBCol>
                        <MDBCol md="2" className="d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">Quantity</p>
                            <p className="lead fw-normal mb-0">{user.quantity}</p>
                          </div>
                        </MDBCol>
                        <MDBCol md="2" className="d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">Price</p>
                            <p className="lead fw-normal mb-0">{user.price}</p>
                          </div>
                        </MDBCol>
                        
                        <MDBCol md="2" className="d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">Status</p>
                            <p className="lead fw-normal mb-0">{user.status}</p>
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>




                )
              }):<AlertDismissibleExample heading="No Orders" body="NO MEDICINES PURCHASED FROM THIS SHOP"/>}
              <MDBCard className="mb-5 ">
                <MDBCardBody className="p-4">
                  <div className="float-end">
                    <p className="mb-0  pe-2 me-5 d-flex align-items-center">
                      <span className="small text-muted me-2">Order total:</span>
                      <span className="lead fw-normal">{sum()}</span>
                    </p>
                  </div>
                </MDBCardBody>
              </MDBCard>

            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>



  );

}