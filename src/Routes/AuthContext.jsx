import {createContext, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [isAuth, setAuth] = useState(false);

    return(
        <AuthContext.Provider value={[isAuth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}

