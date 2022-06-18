import {createContext, useEffect, useState} from "react";

export const ProductContext = createContext();

export const ProductProvider = (props) => {

  const [cart, setCart] = useState(null);

  useEffect(()=>{
    setCart(JSON.parse(localStorage.getItem('cart')))
  },[])

  useEffect(()=>{
    localStorage.setItem('cart', cart);
  })

  return(
    <ProductContext.Provider value={[cart, setCart]}>
      {props.children}
    </ProductContext.Provider>
  )
}
