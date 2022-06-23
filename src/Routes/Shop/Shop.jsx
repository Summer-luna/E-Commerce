import "./Shop.scss";
import ProductCardComponent from "../../components/ProductCard/ProductCard.component";
import { ProductContext } from "../../Context/ProductContext";
import { useContext } from "react";

const Shop = () => {

  const { products } = useContext(ProductContext);

  const renderContent = products != null && products.map((product, index) => {
    return(
      <ProductCardComponent product={product} key={index} />
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