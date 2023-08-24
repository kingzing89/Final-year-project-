import {Box, Flex, Grid,GridItem,Heading ,HStack, IconButton, Input, List ,ListItem, Stack, Text, VStack, useRadioGroup, useToast, RadioGroup, Radio} from "@chakra-ui/react"
import { RadioCard } from "./Rado"
import { useState ,useEffect} from "react" 
import {BsSearchHeartFill} from "react-icons/bs"
import Prod from "./Prod"
import axios from 'axios';
import { useParams ,NavLink, useLocation } from 'react-router-dom';
import Prods from "./Prods"


export default function Item() {
  const {shopid,category}=useParams()
  const options=[category]
  const [product,setProd]=useState([])
 useEffect(() => {
  const controller = new AbortController();
   axios.get('/api/product/getproductscat/', {
     params: {
       shop: shopid,
       category:category
     },
     signal: controller.signal
   })
   .then(function (response) {
     console.log(response);
     setProd(response.data)
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



const { getRootProps, getRadioProps } = useRadioGroup({
  name: 'Category',
  defaultValue: category,
  
})
const group = getRootProps()
  return (
    <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
          {/* sidebar */}
          <GridItem
            as="aside"
            colSpan={{ base: 6, lg: 2, xl: 1 }} 
            bg="teal.400"
            minHeight={{ lg: '100vh' }}
            p={{ base: '20px', lg: '30px' }}
          >
            <List color="grey.200" fontSize="1.2em" spacing={4}>
        
        <ListItem >
              <HStack>
              <Input placeholder='Search' size='sm' bg="white" aria-label="Searchbar" />
              <IconButton  aria-label='Search database' icon={<BsSearchHeartFill />} size={'sm'} />
              </HStack>
        </ListItem>
        <ListItem>
           <Heading as="h5" size="md" border-bottom="1px">Category Selected:</Heading>
           <Stack {...getRootProps()} height={"2"} pt="4" >
                
                <VStack >
                
                { options.map((value) => {
                  const radio = getRadioProps({ value })

                return (
                  <RadioCard key={value} {...radio} >
                  
                  <Text fontSize={"md"}>{value}</Text>
              
                  </RadioCard>
                )
              })}

                 </VStack>
                </Stack>
             
        </ListItem>
     
        <ListItem>

          
        </ListItem>
       
      
      </List>
          </GridItem>
        
          {/* main content & navbar */}
          <GridItem
            as="main"
            colSpan={{ base: 6, lg: 4, xl: 5 }} 
            p="40px"
          >
              <Prod products={product}/>
          </GridItem>
        </Grid>
  )
}
