import {createContext, useState} from "react";

export const AutheContext = createContext();

export const AuthProvider = (props) => {
    const [isAuth, setAuth] = useState(false);

    return(
        <AutheContext.Provider value={[isAuth, setAuth]}>
            {props.children}
        </AutheContext.Provider>
    )
}

