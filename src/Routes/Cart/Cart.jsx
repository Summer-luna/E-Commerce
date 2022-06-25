import "./cart.scss";
import {ProductContext} from "../../Context/ProductContext";
import {useContext, useEffect} from "react";
import CartItemComponent from "../../components/Cart/CartItem.component";
import {Link} from "react-router-dom"
import axios from "axios";
import {CurrencyFormat} from "../../Utility/Currency";


const Cart = () => {

  const {cartItems, getCart} = useContext(ProductContext);

  useEffect(()=>{
    getCart();
  },[])

  const renderContent = cartItems != null && cartItems.map(item =>{
    return(
        <CartItemComponent item={item} key={item._id} getCart={getCart}/>
    )
  });

  const calculateSubtotal = () => {
    let sum = 0;
    cartItems.forEach((item)=>{
      sum += parseFloat(item.price) * item.quantity;
    })
    return sum;
  }

  const processCheckOut = () => {
    console.log("check out!");
    // :todo send cart item' id and quantity to back-end and get the response 'stripe url' from backend
    axios.post("/create-checkout-session")
      .then(r => window.location = r.data.url);
  }

  return(
    <div className="cart-container">
      <h1>Cart</h1>
      <div className="cart">
        <div className="cart-items">
          { renderContent }
        </div>
        <div className="checkout-container">
          <div className="checkout">
            <div className="subtotal">Subtotal <span>{CurrencyFormat(calculateSubtotal())}</span></div>
            <button onClick={processCheckOut}>Check out</button>
            <Link to="/all-products"><button>Continue Shopping</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart