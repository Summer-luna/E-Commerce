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
import OrderSinglePage from "./Routes/Order/OrderSinglePage";

const App = () => {

  return (
    <div className="container">
      <Routes>
        <Route path='/' element={ <Layout />}>
          <Route index element={ <Home /> } />
          <Route path="all-products" element={ <Shop /> }>
            <Route path=":productId" element={ <Product /> } />
          </Route>
          <Route path="category" element={ <Category /> } />
          <Route path="cart" element={ <Cart /> } />
          <Route path="login" element={ <Authentication status="login" /> } />
          <Route path="signup" element={ <Authentication status="signup" /> } />
          <Route  path="account" element={ <ProtectedRouter /> }>
            <Route index element={ <Account /> } />
            <Route path="orders/:orderId" element={ <OrderSinglePage /> } />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;

