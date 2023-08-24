import  {Link as rlink } from 'react-router-dom'

import { Box,Flex,Avatar,HStack,Link,IconButton,Button,Menu,MenuButton,MenuList,MenuItem,MenuDivider,
  useDisclosure,useColorModeValue, Stack,Text} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import Carts from "./Cart.js"

const sLinks = ['Dashboard', 'Shops','Profile'];



  


export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {

    logout()
    
  }

  return (

      <Box bg={useColorModeValue('teal.300', 'gray.900') } px={4} boxShadow="dark-lg"  rounded='md'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box><Text>MediCart</Text></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {sLinks.map((link) => (
                <Link px={2} py={1} rounded={'md'} _hover={{
                  textDecoration: 'none',  bg:'gray.200',}}
                as={rlink} to={link}>
                {link}
              </Link>
             
              ))}
   
              
             <Carts / >
           
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {user&& 
            <Menu>
              
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem  _hover={{ textDecoration: 'none',  bg:'gray.50',}}> 
                {user.email}
              </MenuItem>
                <MenuItem >
                
                 
                </MenuItem>
                <MenuDivider />
                <MenuItem as={Button} onClick={handleClick}  variant={'solid'} colorScheme={'gray'} _hover={{ textDecoration: 'none',  bg:'gray.50',}}>Logout</MenuItem>
              </MenuList>
            </Menu>}
            {!user && (
            <Menu>
              
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem as={rlink} to="Login"  _hover={{ textDecoration: 'none',  bg:'gray.200',}}> 
                Login
              </MenuItem>
                <MenuItem as={rlink} to="Signup"  _hover={{ textDecoration: 'none',  bg:'gray.200',}}>Signup</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>)}
            
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              
              {sLinks.map((link) => (
                <Link px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none',  bg:'gray.200',}}
                as={rlink} to={link}>
                {link}
              </Link>
              ))}
             <Box as="nav" px={-2} py={1} rounded={'md'} >
                <Carts / >
              
              </Box>
            
            </Stack>
          </Box>
        ) : null}
      </Box>

     
 
  );
}