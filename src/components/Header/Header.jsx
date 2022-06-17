import { BsFillCartFill, BsPersonFill } from "react-icons/bs";
import "./header.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isClicked, setClicked] = useState(false);

  const changeNavBar = () => {
    setClicked((preState) => !preState);
  };

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
          {/*<li className="nav-item home-about">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>*/}
          <li className="nav-item home-account">
            <Link to="/account" className="nav-link">
              <BsPersonFill className="header-icon header-account" /> Account
            </Link>
          </li>
          <li className="nav-item home-cart">
            <Link to="/cart" className="nav-link">
              <BsFillCartFill className="header-icon header-cart" /> Cart
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
