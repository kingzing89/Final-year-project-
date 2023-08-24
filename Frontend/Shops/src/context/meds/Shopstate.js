import ShopContext from "./Shopcontext";
import { useState } from "react";

const Shopstate = (props) => {
  const host = "http://localhost:5000"
  const shopsInitial = []
  const [shops, setShops] = useState({})

  // Get all meds
  const getShops = async () => {
    // API Call 
    const response = await fetch(`${host}/api/shopcon/fetchallshops`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json() 
   
    setShops(json)
  }

  // Add a Shop
  const addShops = async (ownername , shopname , phone , shopaddress, city, myFile, myPresc) => {
 
    const response = await fetch(`${host}/api/shopcon/addshops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ownername, shopname, phone ,shopaddress , city , myFile, myPresc })
    });

    const shop = await response.json();
    setShops(shop)
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
  const editMeds = async (id,MedicineName,Category,Price,Quantity) => {
    // API Call 
    const response = await fetch(`${host}/api/medicine/updatemedicines/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({MedicineName,Category,Price,Quantity})
    });
    const json = await response.json(); 
  
     let newmeds = JSON.parse(JSON.stringify(meds))
    // Logic to edit in client
    for (let index = 0; index < newmeds.length; index++) {
      const element = newmeds[index];
      if (element._id === id) {
        newmeds[index].MedicineName = MedicineName;
        newmeds[index].Category = Category;
        newmeds[index].Price = Price; 
        newmeds[index].Quantity=Quantity;
        break; 
      }
    }  
    setMeds(newmeds); 
  } 

  return (
    <ShopContext.Provider value={{addShops,getShops,shops,setShops}}>
      {props.children}
    </ShopContext.Provider>
  )

}
export default Shopstate;