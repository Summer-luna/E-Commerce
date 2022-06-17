import './account.scss';
import {useNavigate, Link} from "react-router-dom";
import {AuthContext} from "../Authentication/AuthContext";
import {useContext} from "react";

const Account = () => {
    const navigate = useNavigate();
    const [isAuth, setAuth] = useContext(AuthContext);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("isAuth");
        setAuth(false);
        navigate("/", {replace: true});
    }

    return(
        <div>
            <div className="myAccount">
                <h1>My Account</h1>
                <div onClick={logout} className="logout">Log out</div>
            </div>
            <div className="account-content">
                <div className="orders">
                    <h2>Order History</h2>
                </div>
                <div className="accountDetails">
                    <h2 className="">Account Details</h2>
                </div>
            </div>
        </div>
    )
}

export default Account