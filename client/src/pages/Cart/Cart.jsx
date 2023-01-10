import CartItemComponent from "./component/CartItem.component";
import {Link} from "react-router-dom"
import {CurrencyFormat} from "../../lib/Currency";
import {useShoppingCart} from "../../Context/ShoppingCartContext";
import {axiosInstance} from "../../lib/axios";

const Cart = () => {

  const {cartItems, getCart} = useShoppingCart();

  const calculateSubtotal = () => {
    let sum = 0;
    cartItems.forEach((item)=>{
      sum += parseFloat(item.price) * item.quantity;
    })
    return sum;
  }

  const processCheckOut = () => {

    axiosInstance.post("/create-checkout-session")
      .then(r => {
        window.location = r.data.url;
      });
  }

  return(
    <div className="px-5 pt-20 md:pt-28">
      <div className="flex flex-col justify-between">
        <div className="w-full pt-20">
          {
            cartItems != null && cartItems.map(item =>{
              return(
                <CartItemComponent item={item} key={item._id} getCart={getCart}/>
              )
            })
          }
        </div>
        <div className="flex">
          <div className="w-full  bg-stone-50  b-72 p-12 right-32 bottom-32 border-2 flex flex-col items-start">
            <div className="text-xl font-semibold mb-20">Subtotal: <span>{CurrencyFormat(calculateSubtotal())}</span></div>
            <button className="mb-5 bg-amber-300 btn" onClick={processCheckOut}>Check out</button>
            <button className="btn border-2 border-amber-400"><Link to="/shop">Continue Shopping</Link></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart