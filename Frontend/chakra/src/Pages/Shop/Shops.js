import { EditIcon, ViewIcon } from "@chakra-ui/icons"
import {  Box,  SimpleGrid, Text, Flex, Heading, Card,  CardHeader, CardBody, CardFooter, HStack,
  Divider, Button, Image, VStack } from "@chakra-ui/react"
import { useLoaderData,Link } from "react-router-dom"
import {BsShopWindow} from "react-icons/bs"
import Med from "./Med.jpg"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from "../../hooks/useAuthContext"


export default function Shops() {
  const { user } = useAuthContext()
  const [tasks,setTask]=useState([])
  console.log(user)
  useEffect(() => {
    const controller = new AbortController();
    axios.get('/api/shop/shopinfos',{
      signal: controller.signal
    })
      .then(response => setTask(response.data))
      .catch(error => console.log(error));
      return () => {
        controller.abort();
      };
  }, []);


  return (
    <SimpleGrid spacing={15} minChildWidth={{sm:"230px",md:"240px",lg:"350px"}} >
      {tasks && tasks.map(task => (
         <Card borderTop="8px" borderColor="cyan.400" bg="white" size="sm" marginTop="5%" p="2%" marginLeft={"10%"} boxShadow="dark-lg" marginRight="5%" marginBottom={"10%"} key={task._id} >

              <CardHeader color="gray.700">
                <Flex > 
                  <Box size='sm'>
                  <Image boxSizes="150"  objectFit='cover' src={Med} />
                  </Box>
                </Flex>
              </CardHeader>
              <Divider borderColor="gray.200" />

              <CardBody color="gray.500">
                <VStack spacing={2}>
                <Heading as='h3' size={'md'}> {task.shopname}</Heading>
                <Text fontSize={'md'}> {task.shopaddress}</Text> 
                <Text fontSize={'md'}> {task.phone}</Text> 
                </VStack>
                
              </CardBody>

              <Divider borderColor="gray.200" />

              <CardFooter>
                <HStack>
                  {task.shopuser}
                  <Button variant="solid" width={{md:"150px",lg:"220px", xl:"270px"}} ml="20px" colorScheme="teal" as={Link} to={ `../Items/${task.shopuser}`}
                  leftIcon={<BsShopWindow /> }>
                    Shop</Button>
             
                </HStack>
              </CardFooter>

              </Card>
        ))}
        

    </SimpleGrid>
  )
}
