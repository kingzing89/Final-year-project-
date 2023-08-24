import { Box, Button,  ButtonGroup, Heading, Link,Popover,  PopoverArrow,  PopoverBody,  PopoverCloseButton,  PopoverContent,  PopoverFooter,  PopoverHeader,  PopoverTrigger,Text,  useColorModeValue } from '@chakra-ui/react'
import { useState,useRef} from 'react'

export function Popovers(props) {
 const {category,drugname}=props
    const initialFocusRef = useRef()
    return (
      <Popover
        initialFocusRef={initialFocusRef}
        placement='bottom'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button colorScheme="cyan">View Description</Button>
        </PopoverTrigger>
        <PopoverContent color='white' bg='gray.700' borderColor='gray.50'>
          <PopoverHeader pt={4} fontWeight='bold' border='0'>
           <Heading as={'h5'} size="md"color="gray.50">  {drugname}</Heading>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Text color={'gray.50'}>
            {`The Drug is used to treat the symptoms of  
           ${ category}`}
            </Text>
          </PopoverBody>
          <PopoverFooter
            border='0'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            pb={4}
          >
            <Box fontSize='sm' color="cyan.400"></Box>
            <ButtonGroup size='sm'>
              <Button colorScheme='green'as={Link} href={`https://www.google.com/search?q=${drugname}`} isExternal>
                Search</Button>
              
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    )
  }