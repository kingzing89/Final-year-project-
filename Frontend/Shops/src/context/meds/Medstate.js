import MedContext from "./Medcontext";
import { useState } from "react";

const MedState = (props) => {
  const host = "http://localhost:5000"
  const medsInitial = []
  const [meds, setMeds] = useState(medsInitial)

  // Get all meds
  const getMeds = async () => {
    // API Call 
    const response = await fetch(`${host}/api/medicine/fetchallmedicines`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    setMeds(json)
  }

  // Add a Medicine
  const addMeds = async ( medicinename,drugname,size,manufacture,category, price, quantity, expirydate,myFile ) => {
 
    const response = await fetch(`${host}/api/medicine/addmedicines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({medicinename,drugname,size,manufacture,category,price,quantity,expirydate,myFile})
    });

    const med = await response.json();
    setMeds(meds.concat(med))
  }

  // Delete a Note
  const deleteMeds = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/medicine/deletemed/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = response.json(); 
    const newmeds = meds.filter((med) => { return med._id !== id })
    setMeds(newmeds)
  }

  // Edit a Note
  const editMeds = async (id, medicinename,drugname,size,manufacture,category, price, quantity, expirydate,myFile ) => {
    // API Call 
    const response = await fetch(`${host}/api/medicine/updatemedicines/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({medicinename,drugname,size,manufacture,category,price,quantity,expirydate,myFile})
    });
    const json = await response.json(); 
    
     let newmeds = JSON.parse(JSON.stringify(meds))
    // Logic to edit in client
    for (let index = 0; index < newmeds.length; index++) {
      const element = newmeds[index];
      if (element._id === id) {
        newmeds[index].medicinename = medicinename;
        newmeds[index].category = category;
        newmeds[index].price = price; 
        newmeds[index].quantity=quantity;
        newmeds[index].drugname=drugname;
        newmeds[index].size=size;
        newmeds[index].manufacture=manufacture;
        newmeds[index].expirydate=expirydate;
        newmeds[index].myFile=myFile;

        break; 
      }
    }  
    setMeds(newmeds); 
  } 

  return (
    < MedContext.Provider value={{ meds,addMeds,deleteMeds,editMeds,getMeds,setMeds}}>
      {props.children}
    </MedContext.Provider>
  )

}
export default MedState;