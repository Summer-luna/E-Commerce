import {CurrencyFormat} from "../../lib/Currency";
import {Link} from "react-router-dom";

export const Order = ({order}) => {
  return (
    <div className="flex justify-between font-bold mb-0.5 bg-white h-16 cursor-pointer mt-5 px-5">
      <div className="my-auto">
        <Link to={`orders/${order.orderId}`}>
          Order Number: {order.orderId}
        </Link>
      </div>
      <div className="my-auto">Amount: {CurrencyFormat(order.subtotal)}</div>
    </div>
  )
}