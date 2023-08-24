import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import MedContext from "../context/meds/Medcontext";
import { useContext } from 'react'
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';
import AlertDismissibleExample from './AlertDismissibleExample';


export default function Medcard() {
    const context = useContext(MedContext);
    const { meds, addMeds, deleteMeds, editMeds, getMeds, setMeds } = context;
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getMeds();

        }
        else {
            history("/");

        }


    }, [])

    const handleImgError = e => {
        e.target.src = "noimageadded.png"
      }
    return (
        <div>
            <MDBRow className='row-cols-1 row-cols-md-2 g-4 ms-5 mb-4 '>
                {meds.length>0?meds.map((user, index) => {
                    return (

                        <MDBCol>
                            <MDBCard className='shadow-5-strong h-100 card mdb-color w-100'>
                                <MDBCardImage

                                    src={user.myFile}
                                    alt={user.drugname}
                                    onError={handleImgError}
                                   
                                    

                                    position='top'
                                    className='h-100'
                                />
                                <MDBCardBody className=''>
                                    <MDBCardTitle className='mb-3'>{`Medicine Name: ${user.medicinename}`}</MDBCardTitle>
                                    <MDBCardText>
                                        <h5> {`Category: ${user.category}\n`}</h5>
                                        <h5> {`Price: ${user.price}\n`}</h5>
                                        <h5> {`Quantity: ${user.quantity}\n`}</h5>


                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>


                    )
                }):<AlertDismissibleExample heading="No Medicines added" body="Please add medicines from medicines menu to show them here"/>}
            </MDBRow>
        </div>












    )
}
