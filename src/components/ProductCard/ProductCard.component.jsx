import './product-card.scss';
import { Add } from "grommet-icons";
import { Link } from "react-router-dom";
import {kebabCase} from "lodash";
import {ProductContext} from "../../Context/ProductContext";
import { useContext } from "react";

const ProductCardComponent = ({product}) => {
  const {cartItems, setCartItems, postCartItems} = useContext(ProductContext);

  const itemsAddToCart = () => {

    const existItem = cartItems.find((item)=>{
      return item._id === product._id
    });

    if(existItem){
      console.log("exist")
      return cartItems.map((item)=> item._id === product._id ? {...item, quantity: item.quantity + 1} : item);
    }

    return [...cartItems, {...product, quantity: 1}]
  }

  const addToCart = (e) => {
    e.preventDefault();
    postCartItems(itemsAddToCart());
    setCartItems(itemsAddToCart());
  }

    return(
        <>
          <Link to={`/all-products/${kebabCase(product.name)}`} className={"product-link"}>
            <div className="product-card" >
              <div className="product-image"
                   style={{backgroundImage: `url(${product.image})`}}>
              </div>
              <div className="product-title">{product.name}</div>
              <div className="product-price">${product.price}</div>
              <div className="add-to-cart-btn" onClick={addToCart}>
                <Add color="white" size="medium" className="add-circle" />
              </div>
            </div>
          </Link>
        </>
    )
}

export default ProductCardComponent;