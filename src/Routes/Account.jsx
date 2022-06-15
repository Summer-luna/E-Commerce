import {useNavigate} from "react-router-dom";
import {AuthContext} from "./AuthContext";
import {useContext} from "react";

const Account = () => {
    const navigate = useNavigate();
    const [isAuth, setAuth] = useContext(AuthContext);

    const logout = () => {
        localStorage.removeItem("isAuth");
        setAuth(false);
        navigate("/", {replace: true});
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <button onClick={logout}>Log Out</button>
        </div>
    )
}

export default Account