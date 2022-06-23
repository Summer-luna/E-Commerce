import "./cart.scss";
import { ProductContext } from "../../components/Context/ProductContext";
import {useContext, useEffect, useState} from "react";
import CartItemComponent from "../../components/Cart/CartItem.component";

const Cart = () => {
  const [products, setProducts, cartItems, setCartItems, popup, setPopup, getCart] = useContext(ProductContext);

  // get user cart from database
  /*const getCart = async () => {
    const res = await axios.get("/getCart");
    setCartItems(res.data.data);
  }*/

  const renderContent = cartItems != null && cartItems.map(item =>{
    return(
      <CartItemComponent item={item} key={item._id} getCart={getCart}/>
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