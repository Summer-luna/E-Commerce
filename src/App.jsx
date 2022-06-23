import './app.scss';
import Layout from "./Routes/Layout";
import Home from './Routes/Home';
import Shop from './Routes/Shop/Shop';
import Category from './Routes/Category';
import Cart from './Routes/Cart/Cart';
import Authentication from './Routes/Account/Authentication';
import Account from "./Routes/Account/Account";
import ProtectedRouter from "./Routes/ProtectedRouter";
import Product from "./Routes/Shop/Product";
import { Route, Routes } from 'react-router-dom';
import {useContext, useEffect} from "react";
import {AuthContext} from "./Context/AuthContext";
import axios from "axios";

const App = () => {

  const [auth, setAuth] = useContext(AuthContext);

  // check if user login when first render
  useEffect(()=>{
    axios.get("/checkAuth")
      .then( res => res.data.auth ? setAuth(true) : setAuth(false));
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

