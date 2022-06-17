import "./product.scss";
import { Add, Subtract } from 'grommet-icons';
import Products from "../../components/ProductCard/ProductData.json";
import {useParams} from "react-router-dom";
import {lowerCase} from "lodash";
import {useState} from "react";

const Product = () => {
  let { productId } = useParams();
  const [item, setItem] = useState();

  const renderContent = Products.map(({name, price, image}, index) => {
    if(lowerCase(name) === lowerCase(productId)){
      return(
        <div className="product" key={index}>
          <img src={image} alt="" />
          <div className="product-content">
            <div className="product-title">{name}</div>
            <div className="product-price-title">Price</div>
            <div className="product-price-amount">${price}</div>
            <div className="product-quantity">
              <div>Quantity</div>
              <div className="add-btn btn">
                <Add color="white" size="small"/>
              </div>
              <div className="product-quantity-amount">1</div>
              <div className="subtract-btn btn">
                <Subtract color="white" size="small" />
              </div>
            </div>
            <button>Add to cart</button>
          </div>
        </div>
      )
    }
  })

  return(
    <>
      {renderContent}
    </>
  )
}
export default Product;