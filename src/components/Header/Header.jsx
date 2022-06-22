import "./header.scss";
import { BsFillCartFill, BsPersonFill } from "react-icons/bs";
import { Cart, Shop } from 'grommet-icons';
import {useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import {ProductContext} from "../../Routes/Shop/ProductContext";

const Header = () => {

  //const [cart, setCart] = useContext(ProductContext);
  const [isClicked, setClicked] = useState(false);
  const [cartActive, setCartActive] = useState(false);

  const changeNavBar = () => {
    setClicked((preState) => !preState);
  };

  /*useEffect(()=>{
    if(cart != null){
      setCartActive(true);
    }
  },[cart])*/

  return (
    <header>
      <Link to="/" className="link" >
        <h3 className="logo">Moon.</h3>
      </Link>
      <input type="text" className="searchField" />
      <nav className={isClicked ? "activeNav" : ""}>
        <ul className="nav-items">
          <li className="nav-item home-shop">
            <Link to="/all-products" className="nav-link">
              Shop
            </Link>
          </li>
          <li className="nav-item home-category">
            <Link to="/category" className="nav-link">
              Category
            </Link>
          </li>
          <li className="nav-item home-account">
            <Link to="/account" className="nav-link">
              <BsPersonFill className="header-icon header-account" /> Account
            </Link>
          </li>
          <li className="nav-item home-cart">
            <Link to="/cart" className="nav-link">
              <Shop color="black" className="header-icon header-cart" /> Cart
              <div className={cartActive ? 'cart-count' : ''}></div>
            </Link>
          </li>
        </ul>
      </nav>
      <div
        className={`lines ${isClicked && "activeLine"}`}
        onClick={changeNavBar}
      >
        <div className="line1 line"></div>
        <div className="line2 line"></div>
        <div className="line3 line"></div>
      </div>
    </header>
  );
};

export default Header;
