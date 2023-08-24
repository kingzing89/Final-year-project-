import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Box, Card, CardBody, CardFooter, CardHeader, Divider, Flex, HStack, Heading, SimpleGrid,Spacer, Text, VStack } from '@chakra-ui/react';
import { PriceTag } from '../component/cartcomponents/Price';
export default function Orders(props) {
    
    const {_id,medicinename,shopname,deliveryaddress,useremail,quantity,price}=props
    return (

      
        <Card  borderTop="8px" borderColor="purple.400" bg="white">

          <CardHeader color="gray.700">
            <Flex gap={5}>
              
              <Box>
                <Heading as="h3" size="sm"> Order {_id}</Heading>
                
              </Box>
            </Flex>
          </CardHeader>

          <CardBody color="gray.500">
          <VStack spacing={2}>

                <Heading as='h3' size={'md'}>MedicineName {medicinename} </Heading>
                <Text fontSize={'md'}>Reciever {useremail} </Text> 
                <Text fontSize={'md'}>Seller {shopname} </Text> 
                <Text fontSize={'md'}> Delivery Address{deliveryaddress}</Text> 
             </VStack>
          </CardBody>

          <Divider borderColor="gray.200" />

          <CardFooter>
            <Flex minWidth='max-content' alignItems='center' columnGap={"42px"} justify="space-between" flex-direction="column" hideFrom="lg">
            <Box>Quantity {quantity}</Box>
            <Spacer />
            <Box>
              <HStack>
                <Box>
                Price
                </Box>
                <Box>
                <PriceTag price={price}/>
            
                </Box>
              </HStack>
              
            
            </Box>
            </Flex>
              <Flex minWidth='max-content' alignItems='center' columnGap={"120px"} justify="space-between" flex-direction="column" hideBelow="lg" >
            <Box>Quantity {quantity}</Box>
            <Spacer />
            <Box>
              <HStack>
                <Box>
                Price
                </Box>
                <Box>
                <PriceTag price={price}/>
            
                </Box>
              </HStack>
              
            
            </Box>
            </Flex>
      
          </CardFooter>

        </Card>
    
  )
}
