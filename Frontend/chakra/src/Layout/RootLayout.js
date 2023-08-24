import { Outlet } from "react-router-dom"
import Headea from "./Header";
import Navbar from "../component/Navbar";


const RootLayout = () => {
    return (
      <div>
        <Headea />
        <Navbar />
       
        <Outlet />
      </div>
    );
}
 
export default RootLayout;