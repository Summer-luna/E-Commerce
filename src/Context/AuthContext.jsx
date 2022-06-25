import {createContext, useState, useEffect} from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    const [isAuth, setAuth] = useState(false);

    // check if user login when first render
    useEffect(()=>{
        axios.get("/checkAuth")
          .then( res => res.data.auth ? setAuth(true) : setAuth(false));
    },[])

    return(
        <AuthContext.Provider value={[isAuth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}

