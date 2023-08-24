import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Components/Loginlook.css"
import { Link } from "react-router-dom";
export const Login =(props) => {
    const [credentials,setCredentials] =useState({email: "", password: ""});
    const navigate = useNavigate();
 
    
    const  handleSubmit = async (e) =>{
        e.preventDefault();
        const response =  await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'

            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})

        })
        
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem("token",json.authtoken);
            navigate("/profile");
            
            



            
        }
        else{
            alert("invalid credentials")
        }
        

        
    }
     const onChange =(e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
     }
    return (
        <div className="logreg">
        <div className="author-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input value={credentials.email} onChange={onChange}type="email"placeholder="youremail@gmail.com" id="email"name="email"/>
            <label htmlFor="password">password</label>
            <input value={credentials.password} onChange={onChange}type="password"placeholder="********" id="password"name="password"/>
            <button className="logbutton" type="submit">Log In</button>
        </form>
        <Link to="/register"><button className="link-btn logbutton" >Don't have an account ? Register here.</button></Link>
        </div>
        </div>
    )
}