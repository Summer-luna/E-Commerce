import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = (props) => {

  const [products, setProducts] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [popup, setPopup] = useState(false);

  const getProducts = async () => {
    const { data } = await axios.get("/getProducts");
    setProducts(data);
  }

  const getCart = async () => {
    const res = await axios.get("/getCart");
    setCartItems(res.data.data);
  }

  useEffect(()=>{
    getProducts();
    getCart();
  },[]);


  return(
    <ProductContext.Provider value={[products, setProducts, cartItems, setCartItems, popup, setPopup, getCart]}>
      {props.children}
    </ProductContext.Provider>
  )
}
