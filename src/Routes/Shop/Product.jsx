import "./product.scss";
import { useParams } from "react-router-dom";
import { lowerCase } from "lodash";
import { useContext, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import SingleProductComponent from "../../components/Single-Product/SingleProduct.component";

const Product = () => {
  const { productId } = useParams();
  const [products, setProducts, cartItems, setCartItems, popup, setPopup] = useContext(ProductContext);

  const findItem = products != null && products.find((product)=>{
    return lowerCase(product.name) === lowerCase(productId);
  })

  return(
    <>
      <SingleProductComponent product={findItem} key={findItem._id} />
    </>
  )
}
export default Product;