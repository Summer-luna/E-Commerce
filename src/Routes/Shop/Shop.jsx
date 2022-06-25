import "./Shop.scss";
import ProductCardComponent from "../../components/ProductCard/ProductCard.component";
import { useProduct } from "../../Context/ProductContext";

const Shop = () => {

  const { products } = useProduct();

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