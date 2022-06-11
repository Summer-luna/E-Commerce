import { Route, Routes } from 'react-router-dom';
import './app.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Home from '../Routes/Home/Home';
import Shop from '../Routes/Shop/Shop';
import Category from '../Routes/Category/Category';
import About from '../Routes/About/About';
import Cart from '../Routes/Cart/Cart';
import Signup from '../Routes/Account/Signup';
import Login from "../Routes/Account/Login";
import Layout from "../Routes/Layout";


const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={ <Layout />}>
          <Route index element={ <Home /> } />
          <Route path="shop" element={ <Shop /> } />
          <Route path="category" element={ <Category /> } />
        </Route>

        
        <Route path="about" element={ <About /> } />
        <Route path="Signup" element={ <Signup /> } />
        <Route path="Login" element={ <Login /> } />
        <Route path="cart" element={ <Cart /> } />
      </Routes>
    </div>
  );
};

export default App;

