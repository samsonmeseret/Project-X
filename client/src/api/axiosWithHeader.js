import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
// const token = JSON.parse(localStorage.getItem("token"));

export const useApi = () => {
  const { token } = useContext(AuthContext);
  console.log(token);
  return axios.create({
    baseURL: `http://localhost:4000`,
    headers: { authorization: `Bearer ${token}` },
  });
};

// const token = JSON.parse(localStorage.getItem("token"));
