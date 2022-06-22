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

  useEffect(()=>{
    getProducts();
  },[]);


  return(
    <ProductContext.Provider value={[products, setProducts, cartItems, setCartItems, popup, setPopup]}>
      {props.children}
    </ProductContext.Provider>
  )
}
