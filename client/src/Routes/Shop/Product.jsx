import "./product.scss";
import { useParams } from "react-router-dom";
import { lowerCase } from "lodash";
import { useState } from "react";
import { useProduct } from "../../Context/ProductContext";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { CurrencyFormat } from "../../Utility/Currency";
import { PopUpComponent } from "../../components/PopupMessage/PopUp.component";
import { ProductQuantityComponent } from "../../components/ProductQuantity/ProductQuantity.component";

const Product = () => {
  const { productId } = useParams();
  const { products } = useProduct();
  const [popup, setPopup] = useState(false);
  const {addToCart, itemQuantity} = useShoppingCart();

  const findItem = products != null && products.find((product)=>{
    return lowerCase(product.name) === lowerCase(productId);
  });

  const handleAddToCart = () => {
    addToCart(findItem, itemQuantity);
    setPopup(true);
    setTimeout(()=>{
      setPopup(false);
    }, 1000);
  }

  return(
    <>
      <div className="product">
        <img src={findItem.image} alt={findItem.name} />
        <div className="product-content">
          <div className="product-title">{findItem.name}</div>
          <div className="product-price-title">Price</div>
          <div className="product-price-amount">{CurrencyFormat(findItem.price)}</div>
          <ProductQuantityComponent />
          <button onClick={handleAddToCart}>Add to cart</button>
        </div>
        {popup && <PopUpComponent title={findItem.name}/>}
      </div>
    </>
  )
}
export default Product;