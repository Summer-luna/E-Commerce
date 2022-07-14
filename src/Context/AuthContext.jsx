import {createContext, useState, useEffect} from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    const [isAuth, setAuth] = useState(false);

    useEffect(()=>{
        const data = localStorage.getItem('isAuth');
        console.log(data);
        data !== null && setAuth(JSON.parse(data));
    },[isAuth]);

    // check if user login when first render
    useEffect(()=>{
        axios.get("/checkAuth")
          .then( res => {
              localStorage.setItem('isAuth', JSON.stringify(res.data.auth));
              setAuth(res.data.auth);
          })
    },[isAuth]);
    //console.log(isAuth);
    return(
        <AuthContext.Provider value={[isAuth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}

