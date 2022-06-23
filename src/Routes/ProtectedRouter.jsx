import {Outlet, Navigate, useLocation} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext";
import {useContext} from "react";

const ProtectedRouter = () => {
    const [isAuth, setAuth] = useContext(AuthContext);

    if(!isAuth){
        return <Navigate to="/login" replace />
    }else {
        return <Outlet />
    }
}

export default ProtectedRouter;