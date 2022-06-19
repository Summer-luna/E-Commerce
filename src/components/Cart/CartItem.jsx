const CartItem = ({items}) =>{
  const renderContent = items != null && items.map(item=>{
    return(
      <div className="cart-item" key={item._id}>
        <img src={item.image} alt={item.name} />
        <div className="item-detail">
          <div className="item-title">{item.name}</div>
          <div className="item-quantity">1</div>
          <button type="button">Remove</button>
        </div>
        <div className="item-price">{item.price}</div>
      </div>
    )
  });

  return(
    <>
      {renderContent}
    </>
  )
}

export default CartItem;