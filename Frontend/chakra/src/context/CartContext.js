import { createContext } from "react";

export const CartContext= createContext()
const Storage = (cartItems) => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.length > 0 ? cartItems : [])
    );
  };
  export const sumItems = (cartItems) => {
  Storage(cartItems)
    let itemCount = cartItems.reduce(
      (total, product) => total + product.quantity,
      0
    );
    let total = cartItems
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
    return { itemCount, total };
  };
export const CartReducer =(state,action)=>
{
    switch(action.type)
  {
      case "Add_to_Cart":
          if (!state.cartItems.find((item) => item._id === action.payload._id)) 
            {
              state.cartItems.push({  ...action.payload, quantity: 1,});
            }
        
      return{...state,...sumItems(state.cartItems),
        cartItem:{...state.cartItem}
      }

      case "Remove_Item":
          return { ...state,...sumItems( state.cartItems.filter((item) => item._id !== action.payload._id))
             , cartItems: [ ...state.cartItems.filter((item) => item._id !== action.payload._id),],};
     
      case "Increase":
         // state.cartItems[ state.cartItems.findIndex((item) => item._id === action.payload.data._id) ].quantity=action.payload.qty
         state.cartItems[state.cartItems.findIndex((item) => item._id === action.payload._id)].quantity=action.payload.quantity
      return {...state, ...sumItems(state.cartItems),cartItems: [...state.cartItems],}
      
      case "Decrease":
          //state.cartItems[ state.cartItems.findIndex((item) => item.id === action.payload.id) ].quantity=action.payload.qty
          state.cartItems[state.cartItems.findIndex((item) => item._id === action.payload._id)].quantity=action.payload.quantity
          return {...state, ...sumItems(state.cartItems),cartItems: [...state.cartItems],}
      case 'CHECKOUT':

              return {cartItems: [],checkout: true, ...sumItems([]),};

      case "Clear"  :
         
          return {cartItem:[],...sumItems([])}     
    default: 
              return state
  } 
}

