import {Add, Subtract} from "grommet-icons";
import {useShoppingCart} from "../../Context/ShoppingCartContext";

export const ProductQuantityBar = () => {

  const {increaseQuantity, decreaseQuantity, itemQuantity} = useShoppingCart();

  return(
    <div className="flex gap-2">
      <div>Quantity</div>
      <button className="btn bg-black rounded-full w-5 h-5 cursor-pointer flex justify-center items-center" onClick={increaseQuantity} >
        <Add color="white" size="small" className="pointer-events-none" />
      </button>
      <div className="product-quantity-amount">{itemQuantity}</div>
      <button className="btn bg-black rounded-full w-5 h-5 cursor-pointer flex justify-center items-center" onClick={decreaseQuantity} >
        <Subtract color="white" size="small" className="pointer-events-none" />
      </button>
    </div>
  )
}