import {Box, Flex, Grid,GridItem,Heading ,HStack, IconButton, Input, List ,ListItem, Stack, Text, VStack, useRadioGroup, useToast, Button} from "@chakra-ui/react"
import { RadioCard } from "./Rado"
import { useState ,useEffect} from "react" 
import {BsSearchHeartFill} from "react-icons/bs"
import Prod from "./Prod"
import axios from 'axios';
import { useParams ,NavLink, Link, useNavigate } from 'react-router-dom';


export default function Items(prop) {
  const options = ['All','fever', 'cold', 'cough',"Anti-biotic","Allergy","BP","Acidity","Hypertension"]
  const [val,setVal]=useState('All')
  const [product,setProd]=useState([])
  const navigate = useNavigate();
  let {shopid}=useParams()

 useEffect(() => {
  axios.get(`/api/product/getproducts/?shop=${shopid}`)
  .then(function (response) {
    // handle success
    console.log(response);
    setProd(response.data)
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  return () => {
   
  };
 }, [])
 
 
 const handClick=(value)=>{
    if(value!=="All")
    {
      navigate(`../Item/${shopid}/${val}`)
    }
 }
 const handClicks=(value)=>{
  if(value!=="All")
  {
    navigate(`../Item/${shopid}/${val}`)
  }
}


  const toast = useToast()

  const handleChange = (value) => {
    setVal(value)
    toast({
      title: `The Category got changed to ${value}!`,
      status: 'success',
      duration: 2000,
    })
   
  
     
  }
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'Category',
    defaultValue: 'All',
    onChange: handleChange,
  })
  const group = getRootProps()
  
  
  return (
    <div>
      {/*Large Screen*/}
      <Grid templateColumns="repeat(6, 1fr)" bg="gray.50" >
      {/* sidebar */}
      <GridItem
        as="aside"
        colSpan={{ base: 6, lg: 2, xl: 1 }} 
        bg="teal.400"
        minHeight={{ lg: '100vh' }}
        p={{ base: '20px', lg: '30px' }}
        boxShadow="dark-lg"  rounded='md'
      >
         <List color="grey.200" fontSize="1.2em" spacing={4}>
          <ListItem >
                <HStack>
                <Input placeholder='Search' size='sm' bg="white" aria-label="Searchbar" />
                <IconButton  aria-label='Search database' icon={<BsSearchHeartFill />} size={'sm'} />
                </HStack>
          </ListItem>

        <ListItem>
            <Box hideBelow='md'>
                
                  
                <Heading as="h5" size="md" border-bottom="1px"> Category:</Heading>
                <Button colorScheme="cyan" type="submit" onClick={()=>handClick(val) }size="sm">
                  Sumbit Category</Button>
                
                <Stack {...getRootProps()} height={"2"} pt="4" >
                
                <VStack >
                
                { options.map((value) => {
                  const radio = getRadioProps({ value })

                return (
                  <RadioCard key={value} {...radio} >
                  
                  <Text fontSize={"sm"}>{value}</Text>
              
                  </RadioCard>
                )
              })}

                 </VStack>
                </Stack>
              </Box>
     </ListItem>
     <ListItem>


      {/*Small Screen*/}
                <Box display={{lg:'none'}}>
                  <HStack>
                <Heading as="h5" size="md" border-bottom="1px"> Category:</Heading>
                <Button colorScheme="cyan" type="submit" onClick={()=>handClick(val) }size="sm">
               
                Sumbit Category</Button>
                </HStack>
                <Flex {...getRootProps()} wrap="wrap" gap="3" mt={4}>
                
                {options.map((value) => {
                  const radio = getRadioProps({ value })

                return (
                  <RadioCard key={value} {...radio} >
                  
                    <Text fontSize={"md"}>{value}</Text>
                  
                  </RadioCard>
                )

              })}
            
                </Flex>
                </Box>
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
    </div>
  )
}
