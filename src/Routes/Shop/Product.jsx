import "./product.scss";
import { useParams } from "react-router-dom";
import { lowerCase } from "lodash";
import {useProduct} from "../../Context/ProductContext";
import {Add, Subtract} from "grommet-icons";
import {useState} from "react";
import {CurrencyFormat} from "../../Utility/Currency";
import {useShoppingCart} from "../../Context/ShoppingCartContext";
import PopUpComponent from "../../components/PopupMessage/PopUp.component";
import {ProductQuantityComponent} from "../../components/ProductQuantity/ProductQuantity.component";

const Product = () => {
  const { productId } = useParams();
  const { products } = useProduct();
  const {cartItems, setCartItems, popup, postCartItems} = useShoppingCart();
  const [itemQuantity, setItemQuantity] = useState(1);

  const findItem = products != null && products.find((product)=>{
    return lowerCase(product.name) === lowerCase(productId);
  })

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
    <>
      <div className="product">
        <img src={findItem.image} alt={findItem.name} />
        <div className="product-content">
          <div className="product-title">{findItem.name}</div>
          <div className="product-price-title">Price</div>
          <div className="product-price-amount">{CurrencyFormat(findItem.price)}</div>
          <ProductQuantityComponent increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} itemQuantity={itemQuantity}/>
          <button onClick={()=>{addToCart(findItem)}}>Add to cart</button>
        </div>
        {popup && <PopUpComponent title={findItem.name}/>}
      </div>
    </>
  )
}
export default Product;