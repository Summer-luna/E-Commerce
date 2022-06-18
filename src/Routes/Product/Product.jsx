import "./product.scss";
import { Add, Subtract } from 'grommet-icons';
import Products from "../../components/ProductCard/ProductData.json";
import {useParams} from "react-router-dom";
import {lowerCase} from "lodash";
import {useState} from "react";

const Product = () => {
  const { productId } = useParams();
  const [count, setCount] = useState(1);

  const changeCount = (e) => {
    //console.log(e.target);
    if(e.target.classList.contains("add-btn")){
      setCount(preValue => preValue + 1);
    }else {
      if(count > 1){
        setCount(preValue => preValue - 1);
      }
    }
  }

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
              <div className="add-btn btn" onClick={changeCount} >
                <Add color="white" size="small" className="icon" />
              </div>
              <div className="product-quantity-amount">{count}</div>
              <div className="subtract-btn btn" onClick={changeCount} >
                <Subtract color="white" size="small" className="icon" />
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