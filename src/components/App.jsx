import './app.scss';
import Layout from "../Routes/Layout";
import Home from '../Routes/Home';
import Shop from '../Routes/Shop/Shop';
import Category from '../Routes/Category';
import Cart from '../Routes/Cart/Cart';
import Authentication from '../Routes/Authentication/Authentication';
import Account from "../Routes/Account/Account";
import ProtectedRouter from "../Routes/ProtectedRouter";
import Product from "../Routes/Product/Product";
import { Route, Routes } from 'react-router-dom';
import {useContext, useEffect} from "react";
import axios from "axios";
import {AuthContext} from "../Routes/Authentication/AuthContext";
import {ProductContext} from "../Routes/Shop/ProductContext";

const App = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [products, setProducts] = useContext(ProductContext);

  // when first render, check if user login, send get request to server to check their cookie
  useEffect(()=>{
    axios.get("/checkAuth")
      .then((res)=>{
        if(res.data.auth){
          setAuth(true);
        }else {
          setAuth(false);
        }
      })
  },[])

  return (
    <div className="container">
      <Routes>
        <Route path='/' element={ <Layout />}>
          <Route index element={ <Home /> } />
          <Route path="all-products" >
            <Route index element={ <Shop /> } />
            <Route path=":productId" element={ <Product /> } />
          </Route>
          <Route path="category" element={ <Category /> } />
          <Route path="cart" element={ <Cart /> } />
          <Route path="login" element={ <Authentication status="login" /> } />
          <Route path="signup" element={ <Authentication status="signup" /> } />
          <Route element={ <ProtectedRouter /> }>
            <Route path="account" element={ <Account /> } />
          </Route>
        </Route>
      </Routes>

    </div>
  );
};

export default App;

