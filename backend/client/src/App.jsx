import './gloabal.css';

import Layout from "./pages/Layout";
import Shop from './pages/Shop/shop';
import Cart from './pages/Cart/Cart';
import Authentication from './pages/Account/Authentication';
import Account from "./pages/Account/Account";
import ProtectedRouter from "./pages/ProtectedRouter";
import Product from "./pages/Shop/components/Product";
import { Route, Routes } from 'react-router-dom';
import OrderSinglePage from "./pages/Order/OrderSinglePage";

const App = () => {

  return (
      <Routes>
        <Route path='/' element={ <Layout />}>
          <Route index element={ <Shop /> } />
          <Route path="shop" >
            <Route index element={ <Shop /> } />
            <Route path=":productId" element={ <Product /> } />
          </Route>
          <Route path="cart" element={ <Cart /> } />
          <Route path="login" element={ <Authentication status="login" /> } />
          <Route path="signup" element={ <Authentication status="signup" /> } />
          <Route  path="profile" element={ <ProtectedRouter /> }>
            <Route index element={ <Account /> } />
            <Route path="orders/:orderId" element={ <OrderSinglePage /> } />
          </Route>
        </Route>
      </Routes>
  );
};

export default App;
