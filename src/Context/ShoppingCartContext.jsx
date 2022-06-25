import {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

const ShoppingCartContext = createContext();

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider = ({children}) => {

  const [popup, setPopup] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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

  // get cart items from database
  useEffect(()=>{
    const getCart = async () => {
      const res = await axios.get("/getCart");
      setCartItems(res.data.data);
    }
    getCart();
  }, []);

  const value = {cartItems, setCartItems, popup, setPopup, postCartItems, increaseQuantity}
  return(
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
