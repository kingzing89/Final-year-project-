import { Avatar, Badge, Box, Button, Center, Heading, Link, Stack, Tabs, TabList, TabPanel, TabPanels, Text, useColorModeValue, Tab } from '@chakra-ui/react'
import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Form } from 'react-router-dom'
export default function Userprofile() {
const { user } = useAuthContext()
  return (
    <Tabs mt="5px" p="20px" variant="enclosed" colorScheme="teal">
        <TabList>
        <Tab _selected={{ color: 'white', bg: 'purple.400' }}>Account Info</Tab>
        <Tab _selected={{ color: 'white', bg: 'purple.400' }}>Task History</Tab>
        </TabList>
        <TabPanels>
         <TabPanel>
          <Center py={6}>
          <Box  maxW= {'320px'}  w={'full'}bg={useColorModeValue('white', 'gray.900')}boxShadow={'2xl'}rounded={'lg'}
            p={6}textAlign={'center'}>
            <Avatar size={'xl'} 
            src={'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'}
              alt={'Avatar Alt'} mb={4} pos={'relative'} 
              _after={{content: '""',w: 4,h: 4,bg: 'green.300',border: '2px solid white',rounded: 'full',pos: 'absolute',bottom: 0,right: 3,
              }}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {user.userName}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} mb={4}>
              {user.email}
            </Text>
            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}>
              Actress, musician, songwriter and artist. PM for work inquires or{' '}
            
              me in your posts
            </Text>

          

          
          </Box>
        </Center>
      </TabPanel>
        <TabPanel>
       <Form>
        
       </Form>
        </TabPanel>

        </TabPanels>
    </Tabs>
  )
}
