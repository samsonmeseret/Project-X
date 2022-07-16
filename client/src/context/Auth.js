import axios from "axios";
import React, { useState, useEffect } from "react";
const url = "http://localhost:4000/me";
const AuthContext = React.createContext({
  token: "",
  whami: "",
  expiredIn: "",
  isAuthenticated: false,
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
          console.log(err.response.data.message);
          console.log(err.response.status);
          if (err.response.status === 401) {
            localStorage.removeItem("whami");
            localStorage.removeItem("token");
            localStorage.removeItem("expiredIn");
          }
        });
    }
    return () => {
      setIsMounted(false);
    };
  }, []);

  const Whami = localStorage.getItem("whami");
  const ExpiredIn = localStorage.getItem("expiredIn");
  const [token, setToken] = useState(initialToken);
  const [expiredIn, setExpiredIn] = useState(ExpiredIn);

  const isAuthenticated = () => {
    if (!token || !expiredIn) {
      return false;
    }
    return new Date().getTime() / 1000 < new Date(expiredIn);
  };

  const loginHandler = (token, expiredIn) => {
    setToken(token);
    setExpiredIn(expiredIn);
    localStorage.setItem("token", token);
    localStorage.setItem("expiredIn", expiredIn);
  };
  const logoutHandler = () => {
    setToken(null);
    setExpiredIn(null);
    localStorage.removeItem("token");
    localStorage.removeItem("whami");
    localStorage.removeItem("expiredIn");
  };

  const contextValue = {
    whami: Whami,
    token: token,
    expiredIn: expiredIn,
    isAuthenticated: isAuthenticated(),
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
