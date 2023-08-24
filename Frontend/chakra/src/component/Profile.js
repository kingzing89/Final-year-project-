import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Profile = () => {
    return (
        <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
          {/* sidebar */}
          <GridItem
            as="aside"
            colSpan={{ base: 6, lg: 2, xl: 1 }} 
            bg="teal.400"
            minHeight={{ lg: '100vh' }}
            p={{ base: '20px', lg: '30px' }}
          >
           <Sidebar />
          </GridItem>
    
          {/* main content & navbar */}
          <GridItem
            as="main"
            colSpan={{ base: 6, lg: 4, xl: 5 }} 
            p="40px"
          >
          <Outlet />
          </GridItem>
        </Grid>
      )
}
 
export default Profile;