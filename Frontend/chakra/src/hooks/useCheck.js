import { useCart } from "./useCart";
import {  useState } from "react";
import axios from "axios"
import { useNavigate,} from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'  
const useCheck = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {Checkout}=useCart()
    const navigate = useNavigate();
    const user=useAuthContext()
 
   const purchase = async (userss,cartItems)=>{
    
    setIsLoading(true)
    setError(null)
    await axios.post('/api/order/neworder/', {
     users:userss,
     products:cartItems,
     deliveryaddress:user.deliveryaddress

  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    
})
.then(function (response) {
  console.log(response);
  Checkout()
  navigate('../Shops')
})
.catch(function (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  }
  
});



   }
  return {error,purchase,isLoading}
}
 
export default useCheck;