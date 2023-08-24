import useCartContext from "./useCartContext"


export const useCart = () => {
    const {dispatch}=useCartContext()
    const AddtoCart=(data)=>{
        dispatch({type:"Add_to_Cart",payload:data})
    
    }
    const Increase=(item)=>{
        dispatch({type:"Increase",payload:item})
    
    }
    const Decrease=(data)=>{
        dispatch({type:"Decrease",payload:data})
    }
     const Clear=()=>{
        dispatch({type:"Clear"})
    }
    const Remove=(data)=>{
        dispatch({type:"Remove_Item",payload:data})
    }
    const Checkout=()=>{
        dispatch({type:"CHECKOUT"})
    }
    return {AddtoCart,Increase,Decrease,Clear,Remove,Checkout};
}
 



