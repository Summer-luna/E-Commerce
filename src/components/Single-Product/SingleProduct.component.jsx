import {Add, Subtract} from "grommet-icons";
import PopUpComponent from "../PopupMessage/PopUp.component";
import {useContext, useState} from "react";
import {ProductContext} from "../../Context/ProductContext";

const SingleProductComponent = ({product}) => {

  const {cartItems, setCartItems, popup, setPopup, postCartItems} = useContext(ProductContext);
  const [itemQuantity, setItemQuantity] = useState(1);

  const increaseQuantity = (e) => {
    setItemQuantity(preValue => preValue + 1);
  }

  const decreaseQuantity = (e) => {
    itemQuantity > 1 && setItemQuantity(preValue => preValue - 1);
  }

  const addToCartItems = (cartItems, product) => {
    //:TODO check cartItems if contains product that we want to add to cart.
    const existCartItem = cartItems.find((cartItem)=>{
      return cartItem._id === product._id;
    });

    /*:TODO if exist, loop all cartItems to find item.id that === product.id,
        then update the cartItem */

    if(existCartItem){
      return cartItems.map((cartItem)=> cartItem._id === product._id ? {...cartItem, quantity: cartItem.quantity + itemQuantity} : cartItem)
    }
    //:TODO if not exist, add product with quantity
    return [...cartItems, {...product, quantity: itemQuantity}];
  }

  const addToCart = async (product) => {
    const data = addToCartItems(cartItems, product);
    // set cartItem
    postCartItems(data);
    setCartItems(data);
  }

  return(
    <div className="product">
      <img src={product.image} alt={product.name} />
      <div className="product-content">
        <div className="product-title">{product.name}</div>
        <div className="product-price-title">Price</div>
        <div className="product-price-amount">${product.price}</div>
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
        <button onClick={()=>{addToCart(product)}}>Add to cart</button>
      </div>
      {popup && <PopUpComponent title={product.name}/>}
    </div>
  )
}

export default SingleProductComponent;