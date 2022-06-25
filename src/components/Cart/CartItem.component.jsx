import {Add, Subtract} from "grommet-icons";
import {useContext} from "react";
import {ProductContext} from "../../Context/ProductContext";
import {kebabCase} from "lodash";
import { Link } from "react-router-dom";
import {CurrencyFormat} from "../../Utility/Currency";

const CartItemComponent = ({ item }) =>{

  const {cartItems, setCartItems, postCartItems, increaseQuantity} = useContext(ProductContext);

  const decreaseQuantity = () => {
    let items
    if(item.quantity === 1){
      items = cartItems.filter(carItem => carItem._id !== item._id)
    }else {
      items = items.map((cartItem)=>{
        return cartItem._id === item._id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem;
      })
    }

    /*items = items.map((cartItem)=>{
      return cartItem._id === item._id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem;
    })
    items = items.filter((item)=>{
      return item.quantity !== 0;
    })*/

    postCartItems(items);
    setCartItems(items);
  }

  const removeItemFromCart = (itemId) => {
    const restCarItems = cartItems.filter(cartItem => {
      return cartItem._id !== itemId;
    })
    postCartItems(restCarItems);
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
            <div className="add-btn btn" onClick={()=>{increaseQuantity(item._id)}} >
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