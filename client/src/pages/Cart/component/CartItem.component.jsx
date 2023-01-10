import {Add, Subtract} from "grommet-icons";
import {kebabCase} from "lodash";
import { Link } from "react-router-dom";
import {CurrencyFormat} from "../../../lib/Currency";
import {useShoppingCart} from "../../../Context/ShoppingCartContext";

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
      <div className="flex flex-col md:flex-row gap-10 md:gap-32 mb-20 md:mb-5 md:after:content-[''] after:w-full after:h-0.5 after:bg-stone-200 md:after:opacity-0" key={item._id}>
        <Link to={`/shop/${kebabCase(item.name)}`}>
          <img src={item.image_url} alt={item.name} className="md:max-w-sm"/>
        </Link>
        <div className="flex flex-col text-left">
          <div className="font-semibold mb-5">{item.name}</div>
          <div className="flex gap-2">
            <div>Quantity</div>
            <div className="btn bg-black rounded-full w-5 h-5 cursor-pointer flex justify-center items-center" onClick={()=>{addToCart(item, 1)}} >
              <Add color="white" size="small" className="icon" />
            </div>
            <div>{item.quantity}</div>
            <div className="btn bg-black rounded-full w-5 h-5 cursor-pointer flex justify-center items-center" onClick={()=>{decreaseQuantity(item._id)}} >
              <Subtract color="white" size="small" className="icon" />
            </div>
          </div>
          <button className="cursor-pointer mt-5 font-semibold text-red-500 text-left" onClick={()=>{removeItemFromCart(item._id)}}>Remove</button>
        </div>
        <div className="font-bold">{CurrencyFormat(item.price)}</div>
      </div>
  )
}

export default CartItemComponent;