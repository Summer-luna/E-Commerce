const OrderItemComponent = ({order}) => {
  return(
    <>
      <div className="order-image"></div>
      <div className="order-title"></div>
      <div className="order-price"></div>
      <div className="order-amount"></div>
      <div className="order-total-price"></div>
      {/*<div className="order-subtotal">{order.subtotal}</div>
      <div className="order-shipping">{order.amount_shipping}</div>
      <div className="order-tax">{order.amount_tax}</div>
      <div className="order-total">{order.total}</div>*/}
    </>
  )
}

export default OrderItemComponent;