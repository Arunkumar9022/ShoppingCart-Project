/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState,useEffect } from "react";
import { useCart } from "./context/CartContext";
import "./ProductCard.css";

export const ProductCard = ({product}) => {

  // eslint-disable-next-line no-unused-vars
  const {addtoCart,cartList,removeFromCart}=useCart();

  const [isInCart,setIsInCart]=useState(false);

 
   
  const {id,name, price, image} = product;

 useEffect(()=>{
  const productisInCart=cartList.find(cartItem=>cartItem.id===id)
  if(productisInCart)
  {
    setIsInCart(true);
  }
  else
  {
    setIsInCart(false);
  }
 },[cartList,id])

  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <p className="name">{name}</p>
      <div className="action">
        <p>${price}</p>
        { isInCart ? (<button className="remove" onClick={()=>removeFromCart(product)}>Remove Cart</button>) :(<button onClick={()=>addtoCart(product)}>Add To Cart</button>)}
        {/* <button onClick={()=>addtoCart(product)}>Add To Cart</button>*/}
        
      </div>
    </div> 
  )
}
