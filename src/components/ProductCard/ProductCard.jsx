import './product-card.scss';
import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom";
import {kebabCase} from "lodash";

const ProductCard = ({products}) => {
    const renderContent = products.map(({name, price, image}, index) => {
        return(
            <Link to={`/all-products/${kebabCase(name)}`} className={"product-link"} >
                <div className="product-card" key={index}>
                        <div className="product-image"
                             style={{backgroundImage: `url(${image})`}}>
                        </div>
                        <div className="product-title">{name}</div>
                        <div className="product-price">${price}</div>
                        <button className="add-to-cart-btn">
                            <GrAdd color="brand" size={"large"}/>
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