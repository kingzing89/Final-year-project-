import { useReducer } from "react";
import {CartReducer,CartContext,sumItems} from "./CartContext";

const storage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const CartProvider = ({children}) => {
   
    const [state, dispatch] = useReducer(CartReducer, { cartItems: storage,
        ...sumItems(storage),
        checkout: false,})
    return ( 
        <CartContext.Provider value={{...state,dispatch}}>
            {children}
        </CartContext.Provider>
     );
}
 
export default CartProvider;