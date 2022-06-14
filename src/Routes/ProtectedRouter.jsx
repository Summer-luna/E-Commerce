import {Outlet, Navigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {AuthContext} from "./AuthContext";
import {useContext} from "react";

const ProtectedRouter = () => {
    //const {state: {isAuth}} = useLocation();
    const [isAuth, setAuth] = useContext(AuthContext)

    if(!isAuth){
        return <Navigate to="/login" replace />
    }else {
        return <Outlet />
    }
}

export default ProtectedRouter;