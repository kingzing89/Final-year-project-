import React,{useState} from "react";
import { Routes ,Route } from "react-router-dom";
import './App.css'
import {Login} from "./login";
import {Register} from "./register";
import Medicinesfrontend from "./Components/Medicinesfrontend";
import Profile from "./Components/Profile";
import NavigationBar from "./Components/NavigationBar";
import MedState from "./context/meds/Medstate";
import Info from "./Components/Info";
import Shopstate from "./context/meds/Shopstate";
import Verificationcard from "./Components/Verificationcard";
import Order from "./Components/Order";


function App() {
  
  const [currentForm,setCurrentForm] = useState('login');
  
  const toggleForm =() =>{
   
    if ( currentForm == "login"){
      setCurrentForm("register");
    }
    else if( currentForm == "register"){
      setCurrentForm("login");
    }
  } 
  return (
    
    <div className="App">
      <Shopstate>
      <MedState>
      <Routes>
       <Route path="/" element={<><Login/></> } />
    
        <Route path="/register" element={ <Register/> } />
        <Route path="/profile" element={<>  <NavigationBar/> <Profile/></> } />
        <Route path="/medicine" element={<> <NavigationBar/> <Medicinesfrontend/></> } />
        <Route path="/verification" element={ <Verificationcard/> } />
        <Route path="/order" element={<> <NavigationBar/> <Order/>  </> } />
        <Route path="/Info" element={ <Info/> } />
      
        
      </Routes>
      </MedState>
      </Shopstate>
    
    
    </div>
  );
}
export default App;
