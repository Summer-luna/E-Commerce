import { useParams } from "react-router-dom";
import { lowerCase } from "lodash";
import { useState } from "react";
import { useProduct } from "../../../Context/ProductContext";
import { useShoppingCart } from "../../../Context/ShoppingCartContext";
import { CurrencyFormat } from "../../../lib/Currency";
import { PopUp } from "../../../components/ui/PopUp";
import { ProductQuantityBar } from "../../../components/ui/ProductQuantity.component";

const Product = () => {

  const { productId } = useParams();
  const { products } = useProduct();

  const [popup, setPopup] = useState(false);
  const {addToCart, itemQuantity, setItemQuantity} = useShoppingCart();

  const findItem = products != null && products.find((product)=>{
    return lowerCase(product.name) === lowerCase(productId);
  });

  const handleAddToCart = () => {
    addToCart(findItem, itemQuantity);

    // reset itemQuantity
    setItemQuantity(1);

    setPopup(true);

    setTimeout(()=>{
      setPopup(false);
    }, 700);

  }

  return(
    <div className="flex flex-col px-10 gap-10 pt-40 md:flex-row md:pt-52 md:justify-between md:gap-x-32">
      <img src={findItem.image_url} alt={findItem.name} className="md:max-w-screen-xl"/>
      <div className="flex w-full flex-col">
        <div className="text-xl font-semibold mb-5">{findItem.name}</div>
        <div className="mb-5">Price</div>
        <div className="mb-5">{CurrencyFormat(findItem.price)}</div>
        <ProductQuantityBar />
        <button className="btn bg-black text-white mt-5" onClick={handleAddToCart}>Add to Cart</button>
      </div>
      { popup && <PopUp title={findItem.name} />}
    </div>
  )
}
export default Product;