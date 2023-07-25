/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useReducer } from "react"
import { CartReducer } from "../reducer/CartReducer";
const initialstate={
    cartList:[],
    total:0
}

const CartContext=createContext(initialstate);


export const CartProvider=({children})=>{
    const [state,dispatch]=useReducer(CartReducer,initialstate);


    const addtoCart=(product)=>{
   const updatedCartList= state.cartList.concat(product)
   updateTotal(updatedCartList);
   dispatch({
    type:"ADD_TO_CART",
    payload:{
        products:updatedCartList
    }
   })
 }
 const removeFromCart=(product)=>{
   const updatedCartList=state.cartList.filter(current=>current.id !==product.id)
   updateTotal(updatedCartList)
   dispatch({
    type:"REMOVE_FROM_CART",
    payload:{
        products:updatedCartList
    }
   })

    }

    const updateTotal=(products)=>{
     let total=0;
    
     products.forEach(product=>total=total+product.price)
     

     dispatch({
        type:"UPDATE_TOTAL",
        payload:{
            total
        }
     })
    }
   
    const value={
        total:state.total,
        cartList:state.cartList,
        addtoCart,
        removeFromCart
    }
    return(
        <CartContext.Provider value={value}>
           {children}
        </CartContext.Provider>
    );
}

export const useCart=()=>{
    const context=useContext(CartContext);

    return context
}