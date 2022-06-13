import { Route, Routes } from 'react-router-dom';
import './app.scss';
import Layout from "../Routes/Layout";
import Home from '../Routes/Home';
import Shop from '../Routes/Shop';
import Category from '../Routes/Category';
import About from '../Routes/About';
import Cart from '../Routes/Cart';
import Signup from '../Routes/Signup';
import Login from "../Routes/Login";
import Account from "../Routes/Account";
import ProtectedRouter from "../Routes/ProtectedRouter";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={ <Layout />}>
          <Route index element={ <Home /> } />
          <Route path="shop" element={ <Shop /> } />
          <Route path="category" element={ <Category /> } />
          <Route path="about" element={ <About /> } />
          <Route path="cart" element={ <Cart /> } />
          <Route path="login" element={ <Login /> } />
          <Route path="signup" element={ <Signup /> } />
          <Route element={ <ProtectedRouter /> }>
            <Route path="account" element={ <Account /> } />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;

