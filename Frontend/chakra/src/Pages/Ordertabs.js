import { SimpleGrid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Orders from './Orders'
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'
import { useParams } from 'react-router-dom';
import base64 from "base-64"
import utf8 from "utf8"
export default function Ordertabs() {

  const [tasks,setTask]=useState([])
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const {email}=useParams()
  var bytes = base64.decode(email);
  var text = utf8.decode(bytes);

useEffect(() => {
  const controller = new AbortController();
   axios.get('/api/order/getuorderse', {
     params: {
       user:text
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
  return () => {
    
  };
}, [])
 
  return (
    <Tabs mt="10px" p="20px" variant="enclosed" colorScheme="purple">
      <TabList>
        <Tab _selected={{ color: 'gray.800', bg: 'teal.400' }}>Order Tab</Tab>
        <Tab _selected={{ color: 'gray.800', bg: 'teal.400' }}>Task History</Tab>
      </TabList>

      <TabPanels py="10px">
        <TabPanel>
        <SimpleGrid spacing={10} minChildWidth={300}>
        {tasks && tasks.map(task => (
            <Orders key={task._id} {...task} />
            
            ))}
          </SimpleGrid>
        </TabPanel>
        <TabPanel>
          
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
