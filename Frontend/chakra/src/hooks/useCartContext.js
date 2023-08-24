import {useContext} from 'react'
import {CartContext} from '../context/CartContext'
const useCartContext = () => {
     const context = useContext(CartContext)
     if(!context)
     {
        throw Error("Cart Provider wrong fully used")
     }
    return (context);
}
 
export default useCartContext;