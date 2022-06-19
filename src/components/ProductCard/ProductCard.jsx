import './product-card.scss';
import {Add} from "grommet-icons";
import { Link } from "react-router-dom";
import {kebabCase} from "lodash";
import {useContext} from "react";
import {ProductContext} from "../../Routes/Shop/ProductContext";


const ProductCard = ({data}) => {
    const [count, setCount] = useContext(ProductContext);

    const add = (e) => {
      e.preventDefault();
      setCount(preValue => preValue + 1);
    }

    const renderContent = data != null && data.map(({name, price, image}, index) => {
        return(
            <Link to={`/all-products/${kebabCase(name)}`} className={"product-link"} key={index}>
                <div className="product-card" >
                        <div className="product-image"
                             style={{backgroundImage: `url(${image})`}}>
                        </div>
                        <div className="product-title">{name}</div>
                        <div className="product-price">${price}</div>
                        <button className="add-to-cart-btn" onClick={add}>
                            <Add color="white" size="medium" className="add-circle" />
                        </button>
                </div>
            </Link>
        );
    });

    return(
        <>
            {renderContent}
        </>
    )
}

export default ProductCard;