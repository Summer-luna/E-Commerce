import "./cart.scss";
import { ProductContext } from "../Shop/ProductContext";
import { useContext } from "react";
import CartItem from "../../components/Cart/CartItem";

const Cart = () => {
  const [cart, setCart, products, setProducts, cartItems, setCartItems] = useContext(ProductContext);

  return(
    <div className="cart-container">
      <h1>Cart</h1>
      <div className="cart">
        <div className="cart-items">
          <CartItem items={cartItems}/>
        </div>
        <div className="checkout-container">Checkout</div>
      </div>
    </div>
  )
}

export default Cart