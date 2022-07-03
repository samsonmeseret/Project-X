import { createContext, useState } from "react";
import axios from "axios";
import { useContext } from "react";
const token = JSON.parse(localStorage.getItem("token"));
const login_url = "http://localhost:4000/login";
const logout_url = "http://localhost:4000/logout";

const AuthContext = createContext({});

//Login
export const Signin = async (email, password) => {
  // const { setToken } = useContext(AuthContext);
  try {
    const response = await axios.post(login_url, {
      email: email,
      password: password,
    });
    const token = response.data.token;
    localStorage.setItem("token", JSON.stringify(token));
    console.log(token);
    // setToken(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

//logOut
export const logOut = async () => {
  try {
    await axios.get(logout_url);
    localStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
};
//Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  // const [token, setToken] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ token, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
