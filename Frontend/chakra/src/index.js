import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { AuthContextProvider } from './context/AuthContexts'
import CartProvider from './context/Cartprovider';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ChakraProvider>
     <AuthContextProvider>   
      <CartProvider>
        <App />
      </CartProvider>
    </AuthContextProvider>
    
    </ChakraProvider>
  </React.StrictMode>
);


