import "./Shop.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import { ProductContext } from "./ProductContext";
import { useContext, useEffect } from "react";
import axios from "axios";

const Shop = () => {

  const [products, setProducts] = useContext(ProductContext);



  const renderContent = products != null && products.map((product, index) => {
    return(
      <ProductCard product={product} key={index} />
    );
  });

  return(
    <div className="products-container">
        <h1>All products</h1>
        <div className="product-cards">
          {renderContent}
        </div>
    </div>
  )
}

export default Shop