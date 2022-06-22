import {Add, Subtract} from "grommet-icons";
import PopUp from "../PopupMessage/PopUp";
import {useContext, useEffect, useState} from "react";
import {ProductContext} from "../../Routes/Shop/ProductContext";
import axios from "axios";

const SingleProductComponent = ({product}) => {

  const [products, setProducts, cartItems, setCartItems, popup, setPopup] = useContext(ProductContext);
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
      return cartItems.map((cartItem)=> cartItem.id === product.id ? {...cartItem, quantity: cartItem.quantity + itemQuantity} : cartItem)
    }
    //:TODO if not exist, add product with quantity
    return [...cartItems, {...product, quantity: itemQuantity}];
  }

  const addToCart = async (product) => {
    const data = addToCartItems(cartItems, product);

    // set cartItem
    setCartItems(data);

    // store cart to database
    const res = await axios.post("/addCart", data);
    if(res.data.isAdded){
      setPopup(true);
      setTimeout(()=>{
        setPopup(false);
      }, 2000);
    }else {
      setPopup(false);
    }
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
      {popup && <PopUp title={product.name}/>}
    </div>
  )
}

export default SingleProductComponent;