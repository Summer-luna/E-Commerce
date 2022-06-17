import {createContext, useState, useEffect} from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    const [isAuth, setAuth] = useState(null);

    useEffect(()=>{
        setAuth(JSON.parse(window.localStorage.getItem('isAuth')));
    },[]);

    useEffect(()=>{
        window.localStorage.setItem('isAuth', isAuth);
    },[isAuth]);

    return(
        <AuthContext.Provider value={[isAuth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}

