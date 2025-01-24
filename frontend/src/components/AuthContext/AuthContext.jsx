import React, {createContext, useState, useContext} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const[loading, setLoading] = useState(false)

    const loginUser = (username, isVerified = false) => {
        setUser({username, isVerified})
    }

    const logoutUser = () => {
        setUser(null)
    };

    const verifyUser = () => {
        if(user) {
            setUser((prevUser) => ({
                ...prevUser, isVerified: true
            }))
        }
    }


    return(
        <AuthContext.Provider value={{user, setUser, loginUser, logoutUser, verifyUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;