import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken } from '../common/asynStorage';
const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        fetchUser();
    }, []);
    const fetchUser = async () => {
        const token = await getToken();
        if (token !== null) {
            console.log('fetchUser', token);
            setIsLoggedIn(true);
        }
        else {
            console.log('fetchUser', token);
            setIsLoggedIn(false);
        }
    }
    return (
        <LoginContext.Provider
            value={{ isLoggedIn, setIsLoggedIn }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;