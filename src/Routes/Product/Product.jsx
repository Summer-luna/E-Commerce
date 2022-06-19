import "./product.scss";
import { Add, Subtract } from 'grommet-icons';
import {useParams} from "react-router-dom";
import {lowerCase} from "lodash";
import {useState, useContext, useEffect} from "react";
import {ProductContext} from "../Shop/ProductContext";
import axios from "axios";
import PopUp from "../../components/PopupMessage/PopUp";

const Product = () => {
  const { productId } = useParams();
  const [count, setCount] = useState(1);
  const [cart, setCart, products, setProducts] = useContext(ProductContext);
  const [popup, setPopup] = useState(false);

  const changeCount = (e) => {
    if(e.target.classList.contains("add-btn")){
      setCount(preValue => preValue + 1);
    }else {
      if(count > 1){
        setCount(preValue => preValue - 1);
      }
    }
  }

  const addToCart = (product) => {
    setCart(preValue => preValue + count);

    axios.post("/addCart", product)
      .then(res => {
        if(res.data.isAdded){
          setPopup(true);
          setTimeout(()=>{
            setPopup(false);
          }, 2000);
        }else {
          setPopup(false);
        }
    });
  }

  //console.log(products);

  const renderContent = products != null && products.map((product) => {
    if(lowerCase(product.name) === lowerCase(productId)){
      return(
        <div className="product" key={product._id}>
          <img src={product.image} alt="" />
          <div className="product-content">
            <div className="product-title">{product.name}</div>
            <div className="product-price-title">Price</div>
            <div className="product-price-amount">${product.price}</div>
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
            <button onClick={()=>{addToCart(product)}}>Add to cart</button>
          </div>
          {popup && <PopUp title={product.name}/>}
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