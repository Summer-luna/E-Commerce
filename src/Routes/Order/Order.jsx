import './order.scss';
import {CurrencyFormat} from "../../Utility/Currency";
import {Link} from "react-router-dom";

export const Order = ({order}) => {
  return (
    <div className="order-item">
      <div className="order-id">
        <Link to={`orders/${order.orderId}`} className="order-link">
          Order Number: {order.orderId}
        </Link>
      </div>
      <div className="order-total">Amount: {CurrencyFormat(order.subtotal)}</div>
    </div>
  )
}