import {Add, Subtract} from "grommet-icons";

export const ProductQuantityComponent = ({increaseQuantity, decreaseQuantity, itemQuantity}) => {
  return(
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
  )
}