import {createContext, useState, useEffect} from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    const [isAuth, setAuth] = useState(false);

    useEffect(()=>{
        const data = localStorage.getItem('isAuth');
        data !== null && setAuth(JSON.parse(data));
    },[])

    // check if user login when first render
    useEffect(()=>{
        axios.get("/checkAuth")
          .then( res => res.data.auth ? localStorage.setItem('isAuth', JSON.stringify(true)) : localStorage.setItem('isAuth', JSON.stringify(false)));
    },[isAuth]);


    return(
        <AuthContext.Provider value={[isAuth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}

