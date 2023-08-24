import { Box, Button, Card, CardBody, CardFooter, CardHeader, Circle, Divider, Flex, HStack, Image, SimpleGrid, Text, Tooltip,chakra,Icon, IconButton, Heading, Center, useToast} from "@chakra-ui/react";
import { FiShoppingCart } from 'react-icons/fi';

import { useCart } from "../../hooks/useCart";
import { PriceTag } from '../../component/cartcomponents/Price'
import { Popovers } from "./Popover";
import { useEffect, useState } from "react";
import { useParams ,NavLink, useLocation } from 'react-router-dom';
import axios from "axios";

export default function Prod(props) {
  const { currency,shopid,cat,products} = props
 
  
  
  const {AddtoCart} = useCart()
  const toast=useToast()
  
  const onAdd=(product)=>{
      AddtoCart(product)
      toast({
        title: `Item ${product.MedicineName} Added to Cart !`,
        status: 'success',
        duration: 2000,
      })
  }



 

    return (
      <>
    <Heading as="h4" size="lg">Medicines</Heading>  
    <SimpleGrid spacing={10} minChildWidth={300} >
          
         {products && products.map(product => (
          <Card borderTop="8px" borderColor="cyan.400" bg="white" key={product._id}>
  
            <CardHeader color="gray.700">
              <Center>
              <Flex gap={5}>
              <Box
                bg={'white'}
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative">
        
            <Circle
              size="10px"
              position="absolute"
              top={2}
              right={2}
              bg="red.200"
            />
          <Image
            src={process.env.PUBLIC_URL + `/${product.myFile}`}
            alt={`Picture of  ${products.medicinename}`}
            width="300px"
            height="240px"
            boxSizes="150"  objectFit='cover'
            roundedTop="lg"
          />
           </Box>
              </Flex>
              </Center>
            </CardHeader>
  
            <CardBody color="gray.500">
            <Flex mt="1" justifyContent="space-between">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated>
                <Heading as="h5" size='sm'>{ product.medicinename} </Heading>
                <Heading as="h5" size='sm'>{ product.shopuser} </Heading>
                <Heading as="h5" size='sm'>{ product.size} </Heading>
              </Box>
              <Tooltip
                label="Add to cart"
                bg="white"
                placement={'top'}
                color={'gray.800'}
                fontSize={'1.2em'}>
                <chakra.label  display={'flex'}>
                  <IconButton as={FiShoppingCart} h={7} w={7} alignSelf={'center'} onClick={()=>onAdd(product)}  />
                </chakra.label>
              </Tooltip>
          
            </Flex>
  
            <Flex justifyContent="space-between" alignContent="center">
        
              <Box fontSize="2xl" color={'gray.800'}>
                <Box as="span" fontSize="lg">
                 <PriceTag price={product.price} currency={currency} />
                </Box>
             
              </Box>
            </Flex>
            </CardBody>
  
            <Divider borderColor="gray.200" />
  
            <CardFooter>
           <Popovers drugname={product.drugname} category={product.category} />
            </CardFooter>
  
          </Card>
         ))}
    
      </SimpleGrid>
      </>
      )
  }
  