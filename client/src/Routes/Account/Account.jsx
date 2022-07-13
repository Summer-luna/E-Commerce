import './account.scss';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import { Order } from "../Order/Order";
import { useShoppingCart } from "../../Context/ShoppingCartContext";

const Account = () => {
  const navigate = useNavigate();
  const [isAuth, setAuth] = useContext(AuthContext);
  const [orders, setOrders] = useState(null);
  const { setCartItems } = useShoppingCart();

  const logout = (e) => {
      e.preventDefault();
      axios.post("/logout")
        .then((res)=>{
          setAuth(false);
          setCartItems(null);
          navigate("/account", { state: { isAuth: false } });
        });
  }

  useEffect(()=>{
    const getOrders = async () => {
      const { data } = await axios.get("/getOrders");
      setOrders(data.orders);
    }
    getOrders();
  },[])

  const renderContent = orders && orders.map( (order) => {
    return (
      <Order order = { order } key={ order.orderId } />
    )
  })

    return(
        <div>
            <div className="myAccount">
                <h1>My Account</h1>
                <div onClick={logout} className="logout">Log out</div>
            </div>
            <div className="account-content">
                <div className="orders">
                    <h2>Order History</h2>
                    { renderContent }
                </div>
                <div className="accountDetails">
                    <h2 className="">Account Details</h2>
                </div>
            </div>
        </div>
    )
}

export default Account