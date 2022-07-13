import axios from "axios";
import React, { useState, useEffect } from "react";
const url = "http://localhost:4000/me";
const AuthContext = React.createContext({
  token: "",
  whami: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");

  const [isMounted, setIsMounted] = useState(true);
  useEffect(() => {
    if (isMounted) {
      axios
        .get(url, { headers: { authorization: `Bearer ${initialToken}` } })
        .then((response) => {
          localStorage.setItem("whami", response.data.me.role);
          console.log(response.data.me.role);
        })
        .catch((err) => {
          localStorage.removeItem("whami");
        });
    }
    return () => {
      setIsMounted(false);
    };
  }, []);

  const Whami = localStorage.getItem("whami");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!Whami;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("whami");
  };

  const contextValue = {
    whami: Whami,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
