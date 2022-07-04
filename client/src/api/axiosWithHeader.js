import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/Auth";

export const useApi = () => {
  const { token } = useContext(AuthContext);
  return axios.create({
    baseURL: `http://localhost:4000`,
    headers: { authorization: `Bearer ${token}` },
  });
};
