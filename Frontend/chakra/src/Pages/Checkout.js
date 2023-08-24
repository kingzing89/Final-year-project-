import { Box, Flex, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, SimpleGrid, Stack, Text, useColorMode } from "@chakra-ui/react";
import { useAuthContext } from '../hooks/useAuthContext'
import { CartOrderSummary } from "./Ordersummary";
import { Link } from "react-router-dom";
const Checkout = () => {
    const { user } = useAuthContext()
    return (  
    <>
     <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={4} flex={1} align={'center'} justify={'center'} boxShadow="dark-lg">

      
      <Heading fontSize={'2xl'} hideFrom={"xl"}>Delivery Details</Heading>
      <Stack spacing={4} w={'full'} maxW={'md'} marginTop="3px">
      <Heading fontSize={'2xl'} hideBelow={'lg'}>Delivery Details</Heading>
      
    
      <Text fontSize='lg'>
       Name : {user.name}
     </Text>
     
     <Text fontSize='lg'>
       Address : {user.address}
     </Text>
     <Text fontSize='lg'>
       Phone : {user.phone}
     </Text>
     <Text fontSize='lg'>
      Delivery Address
     
    </Text>
     </Stack>
 
      </Flex>
      <Flex direction="column" align="center"  boxShadow="dark-lg" flex="1"    py={{
      base: '6',
      md: '8',
      lg: '40',
    }}>
   

        <CartOrderSummary />  
  
      </Flex>
    </Stack>
    
    
    </>);
}
 
export default Checkout;