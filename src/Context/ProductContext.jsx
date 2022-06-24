import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = (props) => {

  const [products, setProducts] = useState(null);
  const [popup, setPopup] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // get product from database
  const getProducts = async () => {
    const { data } = await axios.get("/getProducts");
    setProducts(data);
  }

  // get cart items from database
  const getCart = async () => {
    const res = await axios.get("/getCart");
    setCartItems(res.data.data);
  }

  // store cart items to database
  const postCartItems = async (cartItems) => {
    const res = await axios.post("/addCart", cartItems);
    if(res.data.isAdded){
      setPopup(true);
      setTimeout(()=>{
        setPopup(false);
      }, 1000);
    }else {
      setPopup(false);
    }
  }

  const increaseQuantity = (itemId) => {
    const items = cartItems.map((cartItem)=>{
      return cartItem._id === itemId ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem;
    })
    postCartItems(items);
    setCartItems(items);
  }

  useEffect(()=>{
    getProducts();
    getCart();
  },[]);

  const value = {products, setProducts, cartItems, setCartItems, popup, setPopup, getCart, postCartItems, increaseQuantity}

  return(
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  )
}
