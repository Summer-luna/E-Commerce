import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext";
import {useContext, useEffect, useState} from "react";
import { Order } from "../Order/Order";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import {axiosInstance} from "../../lib/axios";

const Account = () => {
  const navigate = useNavigate();
  const [isAuth, setAuth] = useContext(AuthContext);
  const [orders, setOrders] = useState(null);
  const { setCartItems } = useShoppingCart();

  const logout = (e) => {
    e.preventDefault();

    axiosInstance.post("/logout")
      .then((res)=>{
        setAuth(res.data.auth);
      })
      .then(()=>{
        setCartItems([]);
      })
      .then(()=>{
        navigate("/profile");
      })
  }

  useEffect(()=>{
    const getOrders = async () => {
      const { data } = await axiosInstance.get("/getOrders");
      setOrders(data.orders);
    }
    getOrders();
  },[])


    return(
        <div className="flex flex-col gap-20">
            <div className="flex justify-between pt-40">
                <h1 className="text-xl font-bold font-mono">My Account</h1>
                <div onClick={logout} className="cursor-pointer underline font-bold text-green-700">Log out</div>
            </div>
            <div className="w-5/6">
              <h2 className="text-base font-semibold">Order History</h2>
              {
                orders && orders.map( (order) => (
                  <Order order = { order } key={ order.orderId } />
                ))
              }
            </div>
        </div>
    )
}

export default Account