import "./Shop.scss";
//import Products from "../../components/ProductCard/ProductData.json";
import ProductCard from "../../components/ProductCard/ProductCard";
import { ProductContext } from "./ProductContext";
import { useContext } from "react";

const Shop = () => {

  const [cart, setCart, products, setProducts] = useContext(ProductContext);

  return(
    <div className="products-container">
        <h1>All products </h1>
        <div className="product-cards">
            <ProductCard data={products} />
        </div>
    </div>
  )
}

export default Shop