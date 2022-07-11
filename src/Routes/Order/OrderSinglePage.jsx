import './order-single-page.scss';
import OrderItemComponent from "../../components/OrderItem/OrderItem.component";

const OrderSinglePage = () => {

  return(
    <div className="order">
      <div className="welcome-component">
        <h1>hi, Luna</h1>
        <p>Not Luna? logout here</p>
      </div>

      <div className="order-details">
        <div className="order-title">
          <h3>ORDER DETAILS</h3>
          <p>thanks for your order! check out the details below.</p>
        </div>
        <div className="order-detail">
          <div className="order-number">
            <div className="order-number-title">ORDER NUMBER</div>
            <div className="order-number-id">#14017181</div>
          </div>
          <div className="order-date">
            <div className="order-date-title">ORDER DATE</div>
            <div className="order-date-id">july 28, 2019</div>
          </div>
        </div>
        <div className="order-products-grid">
          <OrderItemComponent />
        </div>
      </div>

    </div>
  )
}

export default OrderSinglePage;