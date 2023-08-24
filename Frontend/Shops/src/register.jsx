import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Register =(props) => {

    const [credentials,setCredentials]=useState({name:"",email: "", password: ""});
    const navigate = useNavigate();

    const  handleSubmit = async (e) =>{
        e.preventDefault();
        const response =  await fetch("http://localhost:5000/api/auth/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'

            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})

        })
        
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem("token",json.authtoken);
            navigate("/Info");
            
            



            
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
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={credentials.name} onChange={onChange} name="name" id="name" placeholder="Full Name"></input>
            <label htmlFor="email">email</label>
            <input value={credentials.email}onChange={onChange}type="email"placeholder="youremail@gmail.com" id="email"name="email"/>
            <label htmlFor="password">password</label>
            <input value={credentials.password}onChange={onChange}type="password"placeholder="********" id="password"name="password"/>
            <button  className="logbutton" type="submit">Signup</button>
        </form>
       <Link to="/"> <button className="link-btn logbutton">Already have an account ? Log In.</button></Link>
        </div>
        </div>
 
    )
}
