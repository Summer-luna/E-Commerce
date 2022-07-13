import {createContext, useContext, useState, useEffect} from "react";
import {AuthContext} from "./AuthContext";
import axios from "axios";

const ShoppingCartContext = createContext();

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider = ({children}) => {

  const [isAuth] = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(1);

  const increaseQuantity = (e) => {
    setItemQuantity(preValue => preValue + 1);
  }

  const decreaseQuantity = (e) => {
    itemQuantity > 1 && setItemQuantity(preValue => preValue - 1);
  }

  const addToCartItems = (product, itemQuantity) => {

    // check cartItems if contains product that we want to add to cart.
    const existCartItem = cartItems.find((cartItem)=>{
      return cartItem._id === product._id;
    });

    // if existed, loop all cartItems to find item.id that === product.id,then update the cartItem
    if(existCartItem){
      return cartItems.map((cartItem)=> cartItem._id === product._id ? {...cartItem, quantity: cartItem.quantity + itemQuantity} : cartItem)
    }

    // if not exist, add product with quantity
    return [...cartItems, {...product, quantity: itemQuantity}];
  }

  const addToCart = async (product, itemQuantity) => {
    const data = addToCartItems(product, itemQuantity);
    setCartItems(data);
  }

  // get cart items from database when user login
  useEffect(() => {
    const getCart = async () => {
      if(isAuth){
        const { data } = await axios.get("/getCart");
        setCartItems(data.data);
      }
    }
    getCart();
  }, [isAuth]);

  // if cartItem changes, save it to database
  useEffect(()=>{

    if(isAuth){
      const timeId = setTimeout(async ()=>{
        await axios.post("/addCart", cartItems);
      }, 1000);

      return(()=>{
        clearTimeout(timeId);
      })
    }

  },[cartItems]);

  const value = {cartItems, setCartItems, increaseQuantity, decreaseQuantity, itemQuantity, addToCart}

  return(
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
