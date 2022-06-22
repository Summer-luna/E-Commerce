import './product-card.scss';
import { Add } from "grommet-icons";
import { Link } from "react-router-dom";
import {kebabCase} from "lodash";

const ProductCard = ({product: {name, price, image}}) => {

    return(
        <>
          <Link to={`/all-products/${kebabCase(name)}`} className={"product-link"}>
            <div className="product-card" >
              <div className="product-image"
                   style={{backgroundImage: `url(${image})`}}>
              </div>
              <div className="product-title">{name}</div>
              <div className="product-price">${price}</div>
              <button className="add-to-cart-btn">
                <Add color="white" size="medium" className="add-circle" />
              </button>
            </div>
          </Link>
        </>
    )
}

export default ProductCard;