import {Outlet, Navigate, useLocation} from "react-router-dom";
import {AuthContext} from "./AuthContext";
import {useContext, useEffect} from "react";

const ProtectedRouter = () => {
    //const {state: {isAuth}} = useLocation();
    const [isAuth, setAuth] = useContext(AuthContext);

    if(!isAuth){
        return <Navigate to="/login" replace />
    }else {
        return <Outlet />
    }
}

export default ProtectedRouter;