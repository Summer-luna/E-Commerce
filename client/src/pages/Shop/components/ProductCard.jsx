import {CurrencyFormat} from "../../lib/Currency";

import { Link } from "react-router-dom";

export const ProductCard = (props) => {
  const {_id, name, image_url, price} = props.data;

  return <Link to={`/shop/${name}`}>
    <img src={image_url}  alt={name}/>
    <h1 className="font-bold">{name}</h1>
    <p>{CurrencyFormat(price)}</p>
  </Link>
}