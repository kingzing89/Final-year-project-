import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'
export default function useOrder() {
    const [tasks,setTask]=useState([])
    
    const getOrder=async(email)=>{
      const controller = new AbortController();
        await axios.get('/api/order/getuorderse', {
           params: {
             user: email
           },
           signal: controller.signal
         })
         .then(function (response) {
           console.log(response);
           setTask(response.data)
         })
         .catch(function (error) {
           console.log(error);
         })
         .finally(function () {
          // always executed
          controller.abort();
        })
        }
    return {getOrder,tasks,setTask}
}
