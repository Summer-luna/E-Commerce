import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = (props) => {

  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [cartItems, setCartItems] = useState(null);

  /*useEffect(()=>{
    setCart(JSON.parse(localStorage.getItem('cart')))
  },[])

  useEffect(()=>{
    localStorage.setItem('cart', cart);
  })*/

  useEffect(()=>{
    axios.get("/products")
      .then((res)=>{
        setProducts(res.data);
      });
  }, [])

  useEffect(()=>{
    axios.get("/getCart")
      .then(res => {
        setCartItems(res.data.data);
      })
  }, [])

  return(
    <ProductContext.Provider value={[cart, setCart, products, setProducts, cartItems, setCartItems]}>
      {props.children}
    </ProductContext.Provider>
  )
}
