import { HStack, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { NavLink ,Link} from "react-router-dom";
import  {FaUser} from "react-icons/fa"
import  {TfiNotepad} from "react-icons/tfi"
import React, { useEffect } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import base64 from "base-64"
import utf8 from "utf8"
export default function Sidebar() {
  const {user}=useAuthContext()

  var bytes = utf8.encode(user.email);
  const email = base64.encode(bytes);
  useEffect(() => {
    const timer = setTimeout(() => {
      
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <List color="gray.800" fontSize="1.2em" spacing={4}>
    <ListItem>
    <NavLink to="UserProfile">
      <HStack>
    <ListIcon as={FaUser} />
          <Text > UserProfile</Text>
          </HStack>
      </NavLink>
    </ListItem>
    <ListItem>
    <NavLink to={`Orders/${email}`}>
       <HStack> 
         <ListIcon as={TfiNotepad} />
         <Text>Orders</Text>
         </HStack>
      
      </NavLink>             
    </ListItem>
    <ListItem>

       
    </ListItem>
  </List>
  )
}
