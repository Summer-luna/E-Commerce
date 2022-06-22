import "./cart.scss";
import { ProductContext } from "../Shop/ProductContext";
import {useContext, useEffect, useState} from "react";
import CartItem from "../../components/Cart/CartItem";
import axios from "axios";

const Cart = () => {
  const [products, setProducts, cartItems, setCartItems] = useContext(ProductContext);
  const [deleted, setDeleted] = useState(false);
  console.log(deleted);

  useEffect(()=>{
    getCart();
  }, [])

  // get user cart from database
  const getCart = async () => {
    const res = await axios.get("/getCart");
    setCartItems(res.data.data);
  }

  const renderContent = cartItems != null && cartItems.map(item =>{
    return(
      <CartItem item={item} key={item._id} getCart={getCart}/>
    )
  });

  return(
    <div className="cart-container">
      <h1>Cart</h1>
      <div className="cart">
        <div className="cart-items">
          { renderContent }
        </div>
        <div className="checkout-container">Checkout</div>
      </div>
    </div>
  )
}

export default Cart