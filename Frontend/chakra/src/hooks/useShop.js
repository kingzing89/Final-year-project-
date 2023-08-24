import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function useShop(url) {
  const [data,setData]=useState([])
  useEffect(() => {
    axios.get(url)
    .then(function (response) {
      // handle success
      console.log(response);
      setData(response.data)
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    
    return () => {
   
    };
  }, [url])
  return {data}

  
}
