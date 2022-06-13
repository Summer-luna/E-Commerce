import {Outlet, Navigate} from "react-router-dom";

const ProtectedRouter = () => {

    const isLogin = false;
    if(!isLogin){
        return <Navigate to="/login" replace />
    }else {
        return <Outlet />
    }
}

export default ProtectedRouter;