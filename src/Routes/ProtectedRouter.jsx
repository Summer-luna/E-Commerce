import {Outlet, Navigate} from "react-router-dom";
import {useLocation} from "react-router-dom";

const ProtectedRouter = () => {
    const {state: {isAuth}} = useLocation();

    if(!isAuth){
        return <Navigate to="/login" replace />
    }else {
        return <Outlet />
    }
}

export default ProtectedRouter;