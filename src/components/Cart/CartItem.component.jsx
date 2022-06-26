import {Add, Subtract} from "grommet-icons";
import {kebabCase} from "lodash";
import { Link } from "react-router-dom";
import {CurrencyFormat} from "../../Utility/Currency";
import {useShoppingCart} from "../../Context/ShoppingCartContext";

const CartItemComponent = ({ item }) =>{

  const {cartItems, setCartItems, postCartItems, addToCart} = useShoppingCart();

  const decreaseQuantity = () => {

    let items = cartItems.map((cartItem)=>{
      return cartItem._id === item._id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem;
    })

    items = items.filter((item)=>{
      return item.quantity !== 0;
    })
    setCartItems(items);
  }

  const removeItemFromCart = (itemId) => {
    const restCarItems = cartItems.filter(cartItem => {
      return cartItem._id !== itemId;
    })
    setCartItems(restCarItems);
  }

  return(
      <div className="cart-item" key={item._id}>
        <Link to={`/all-products/${kebabCase(item.name)}`} className="item-link">
          <img src={item.image} alt={item.name} />
        </Link>
        <div className="item-detail">
          <div className="item-title">{item.name}</div>
          <div className="product-quantity">
            <div>Quantity</div>
            <div className="add-btn btn" onClick={()=>{addToCart(item, 1)}} >
              <Add color="white" size="small" className="icon" />
            </div>
            <div className="product-quantity-amount">{item.quantity}</div>
            <div className="subtract-btn btn" onClick={()=>{decreaseQuantity(item._id)}} >
              <Subtract color="white" size="small" className="icon" />
            </div>
          </div>
          <div className="removeItem" onClick={()=>{removeItemFromCart(item._id)}}>Remove</div>
        </div>
        <div className="item-price">{CurrencyFormat(item.price)}</div>
      </div>
  )
}

export default CartItemComponent;