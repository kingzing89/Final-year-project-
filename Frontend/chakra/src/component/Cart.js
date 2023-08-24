import {Button,Divider, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Heading, Icon, IconButton, Spacer,SimpleGrid, useDisclosure, Box, Text, Input, Stack, Flex} from "@chakra-ui/react"
import {MdShoppingCart, MdClose} from "react-icons/md"
import useCartContext from "../hooks/useCartContext"
import  {Link  } from 'react-router-dom'
import { CartItem } from "./cartcomponents/cItem"
import { FaArrowRight } from 'react-icons/fa'
import { PriceTag } from './cartcomponents/Price'

const Cart = (props) => {
  const {currency}=props
  const { isOpen, onOpen, onClose } = useDisclosure()  
  const {cartItems,total} = useCartContext()

    return (
        <>
            <Button rightIcon={<MdShoppingCart />} color="grey.400" colorScheme="teal.300"  as={'nav'} onClick={onOpen} _hover={{
                  textDecoration: 'none',  bg:'gray.200',}}  size={{base:"sm",md:"md"}} >
          Cart
        </Button>

      
        <Drawer placement={'right'} onClose={onClose} isOpen={isOpen} size={{base:"sm",md:"md"}}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerHeader borderBottomWidth='1px' bg="teal.400">
        <HStack >
               <Heading size='md' >Cart</Heading>
               <Icon  as={MdShoppingCart} />
               <Spacer />
              <IconButton icon={<MdClose /> } onClick={onClose}/>
          </HStack>
               
        </DrawerHeader>
         <DrawerBody>
                  <Box  maxW={{base: '3xl', lg: '6xl',}}mx="auto"
                        px={{  base: '1', md: '6', lg: '2',}}
                        py={{ base: '6', md: '8', lg: '4',}}>
              <Stack
                direction={{ base: 'column', lg: 'row',}}
                align={{ lg: 'flex-start', }}
                spacing={{base: '8', md: '16',}}
               >

                <Stack
                  spacing={{ base: '8', md: '10', }}
                  flex="2">

                  <Heading fontSize="2xl" fontWeight="bold">
                    Shopping Cart Items {cartItems &&cartItems.length}
                  </Heading>
                  <Divider />
                  <Stack spacing="6"  >
                    
                  {cartItems && cartItems.map((item) => (
                   <CartItem key={item.id} {...item} />
          ))}
                  </Stack>
                </Stack>

              
              </Stack>
            </Box>
        
        </DrawerBody>
        <DrawerFooter height={'30%'} > 
        <Flex direction="column" align="center" flex="1">
            <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
        <Stack spacing="6">
        <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color='gray.600'>
        SubTotal
      </Text>
      <Text fontWeight="medium"><PriceTag price={total} currency={currency} /></Text>
      </Flex>
 
        </Stack>
        <Button as={Link} to={'../Checkout'} colorScheme={'cyan'} variant={'solid'} size="md" fontSize="md" rightIcon={<FaArrowRight />}>
        Checkout
      </Button>
        </Stack>
     
      </Flex>
       
        </DrawerFooter>
        </DrawerContent>
          
        </Drawer>
        </>
      );
}
 
export default Cart;