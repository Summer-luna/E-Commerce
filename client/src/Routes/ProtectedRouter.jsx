import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import {useContext} from "react";
import Authentication from "./Account/Authentication";

const ProtectedRouter = () => {
    const [isAuth, setAuth] = useContext(AuthContext);
    return isAuth ? <Outlet /> : <Authentication status="login" />
}

export default ProtectedRouter;