import './product-card.scss';
import { Add } from "grommet-icons";
import { Link } from "react-router-dom";
import {kebabCase} from "lodash";
import { CurrencyFormat } from "../../Utility/Currency"
import { useShoppingCart } from "../../Context/ShoppingCartContext";

const ProductCardComponent = ({product}) => {
  const {addToCart} = useShoppingCart();

    const addOneItemToCart = (e) => {
      e.preventDefault();
      addToCart(product, 1);
    };

    return(
        <>
          <Link to={`/all-products/${kebabCase(product.name)}`} className={"product-link"}>
            <div className="product-card" >
              <div className="product-image"
                   style={{backgroundImage: `url(${product.image})`}}>
              </div>
              <div className="product-title">{product.name}</div>
              <div className="product-price">{CurrencyFormat(product.price)}</div>
              <div className="add-to-cart-btn" onClick={addOneItemToCart}>
                <Add color="white" size="medium" className="add-circle" />
              </div>
            </div>
          </Link>
        </>
    )
}

export default ProductCardComponent;