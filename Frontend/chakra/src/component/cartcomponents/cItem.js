import { Box, Button, CloseButton, Flex,IconButton, Input,Link, Select, Spacer, useColorModeValue } from '@chakra-ui/react'
import { PriceTag } from './Price'
import { CartProductMeta } from './Cartmeta'

import {  useState } from "react"
import { MdExpandLess, MdExpandMore} from "react-icons/md"
import { IoTrash} from "react-icons/io5";
import { useCart } from '../../hooks/useCart'

export const CartItem = (props) => {
  const {  isGiftWrapping,  medicinename,  description,  myFile,  currency,  price ,_id,image,quantity} = props
    const {Increase,Decrease,Remove,Clear}=useCart()
    const [qty, setQty]=useState(quantity)
   

    const up=(item)=>{
      
        setQty(item.quantity+1)
        item.quantity=qty+1
        Increase(item)
  
    }
    const down=(item) =>{
      setQty(item.quantity-1)
      item.quantity=qty-1
      Decrease(item)

  }
    return (

            <Flex
            mt="-2"
            direction={{
              base: 'column',
              md: 'row',
            }}
            justify="space-between"
            align="center"
            
         
          >
        
            <CartProductMeta
              name={medicinename}
              description={_id}
              image={process.env.PUBLIC_URL + `/${myFile}`}
              isGiftWrapping={isGiftWrapping}
            />
            
      
            {/* Desktop */}
            <Flex
              ml={{md:"-100",lg:"-160"}}
              mt={{md:'12',lg:"16"}}
              mr={{lg:'-3'}}
              width="100%"
              justify="space-between"
              display={{
                base: 'none',
                md: 'flex',
              }}
           
            > 
            <Box >
      
                      <IconButton variant='outline' colorScheme='teal' aria-label='Decrease' size='xs' pr="3"icon={<MdExpandMore />} 
                      onClick={()=>down({_id,medicinename,myFile,quantity})} isDisabled={qty===0} />
                     
                        <Input type="text" size={'sm'} maxWidth={'40%'} value={qty} aria-label="quantity" px="3" / >
                        <IconButton variant='outline' colorScheme='teal' aria-label='Increase' size='xs'icon={<MdExpandLess /> } 
                      onClick={()=>up({_id,medicinename,myFile,quantity})} isDisabled={qty===9} />
                   
       
              </Box>
              <Box>
              <Spacer />
              <Spacer />
              <PriceTag price={price*qty} currency={currency}  />

              </Box>
            </Flex>
            <Box pb='10' display={{base:"none",md:'flex'}}>
            <CloseButton aria-label={`Delete ${medicinename} from cart`} onClick={()=>Remove({_id,medicinename,myFile,quantity})} color='red' />
            </Box>
            {/* Mobile */}
            <Flex
              mt="4"
              align="center"
              width="full"
              justify="space-between"
              display={{
                base: 'flex',
                sm:'flex',
                md: 'none',
              }}
            >
    
             <Button aria-label='Delete' fontSize={'sm'} leftIcon={<IoTrash />} colorScheme='teal' onClick={()=>Remove({_id,medicinename,image,quantity,price})}>
              Delete
              </Button>
              <Box pl='15%'>
      
                      <IconButton variant='outline' colorScheme='teal' aria-label='Decrease' size='xs' pr="3"icon={<MdExpandMore />} 
                      onClick={()=>down({_id,medicinename,myFile,quantity,price})} isDisabled={qty===0} />
                     
                        <Input type="text" size={'sm'} maxWidth={'40%'} value={qty} aria-label="quantity" px="3" / >
                        <IconButton variant='outline' colorScheme='teal' aria-label='Increase' size='xs'icon={<MdExpandLess /> } 
                      onClick={()=>up({_id,medicinename,myFile,quantity,price})} isDisabled={qty===9} />
       
              </Box>
            
              <PriceTag price={price} currency={currency} />
            </Flex>
          </Flex>

   )
  }
