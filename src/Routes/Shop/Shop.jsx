import "./Shop.scss";
import Products from "../../components/ProductCard/ProductData.json";
import ProductCard from "../../components/ProductCard/ProductCard";

const Shop = () => {
  return(
    <div className="products-container">
        <h1>All products </h1>
        <div className="product-cards">
            <ProductCard products={Products} />
        </div>
    </div>
  )
}

export default Shop