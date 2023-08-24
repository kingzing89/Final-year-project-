import {  createBrowserRouter,  createRoutesFromElements, Route, RouterProvider,Navigate } from 'react-router-dom'
import RootLayout from './Layout/RootLayout';
import Dashboard from './Pages/Home';

import Login from './Pages/Login';
import SignupCard from './Pages/Signup'
import Carts from './component/Cart.js'
import Shops from './Pages/Shop/Shops'
import Items from './Pages/Items/Items'
import Item from './Pages/Items/Item'

import { useAuthContext } from './hooks/useAuthContext'

import Checkout from './Pages/Checkout';
import Profile from './component/Profile';
import Userprofile from './Pages/Userprofile';

import Ordertabs from './Pages/Ordertabs';



function App() {
  
  const { user } = useAuthContext()
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Shops" element={user ? <Shops /> : <Navigate to="../Login"/>} /> 
        <Route path="Login" element={!user ? <Login /> : <Navigate to="../Shops"/>} />
        <Route path="Signup" element={<SignupCard />} />
        <Route path="Cart" element={<Carts />} />
        <Route path="Profile" element={user ? <Profile /> : <Navigate to="../Login"/>}>
        <Route index element={user ? <Userprofile /> : <Navigate to="../Login"/>} />
        <Route path="Userprofile" element={user ? <Userprofile /> : <Navigate to="../Login"/>} />
        <Route path="Orders/:email" element={user ? <Ordertabs /> : <Navigate to="../Login"/>} /> 
        </Route>   
        <Route  path="Items/:shopid" element={user ? <Items /> : <Navigate to="../Login"/>} /> 
        <Route path= "Item/:shopid/:category" element={user ?<Item /> : <Navigate to="../Login"/>} />         
      <Route path="Checkout" element={user ?<Checkout/> : <Navigate to="../Login"/>} /> 
      </Route>
   
    )
  )
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
