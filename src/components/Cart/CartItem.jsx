import {Add, Subtract} from "grommet-icons";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const CartItem = ({ item, getCart }) =>{

  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const navigate = useNavigate();

  const increaseQuantity = (e) => {
    setItemQuantity(preValue => preValue + 1);
  }

  const decreaseQuantity = (e) => {
    itemQuantity > 1 && setItemQuantity(preValue => preValue - 1);
  }

  const removeItemFromCart = async (itemId) => {
    // post item to database and remove it from user's cart
    const { data } = await axios.post("/removeItem", {itemId: itemId});

    if(data.deleted){
      getCart();
      navigate("/cart", {replace: true});
    }
  }

  return(
      <div className="cart-item" key={item._id}>
        <img src={item.image} alt={item.name} />
        <div className="item-detail">
          <div className="item-title">{item.name}</div>
          <div className="product-quantity">
            <div>Quantity</div>
            <div className="add-btn btn" onClick={increaseQuantity} >
              <Add color="white" size="small" className="icon" />
            </div>
            <div className="product-quantity-amount">{itemQuantity}</div>
            <div className="subtract-btn btn" onClick={decreaseQuantity} >
              <Subtract color="white" size="small" className="icon" />
            </div>
          </div>
          <div className="removeItem" onClick={()=>{removeItemFromCart(item._id)}}>Remove</div>
        </div>
        <div className="item-price">${item.price}</div>
      </div>
  )
}

export default CartItem;