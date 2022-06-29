import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
const url = "http://localhost:4000/login";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { setToken } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const submitHanddler = async (e) => {
    e.preventDefault();
    if (!user || !pwd) {
      return setErrMsg("Missing Username or Password");
    }
    try {
      const response = await axios.post(url, { email: user, password: pwd });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Please provid Email and Password!");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid email or password");
      } else {
        setErrMsg("Login failed");
      }
    }
    setUser("");
    setPwd("");
    navigate(from, { replace: true });
  };
  return (
    <>
      {success ? (
        <h1 style={{ textAlign: "center" }}>Logged in Successfully</h1>
      ) : (
        <div>
          <p ref={errRef}>{errMsg}</p>
          <h1 style={{ color: "blueviolet", textAlign: "center" }}>HealEye</h1>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            noValidate
            autoComplete="off"
            onSubmit={submitHanddler}
          >
            <TextField
              ref={userRef}
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
              type={"email"}
              required
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <TextField
              id="outlined"
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              label="Password"
              type={"password"}
              variant="outlined"
            />
            <Button
              sx={{
                background: "#f1f5f8",
                padding: ".8rem 0",
                fontWeight: "500",
                textTransform: "capitalize",
                color: "#444",
                background: "#f1f5f8",
                display: "inline",
              }}
              type="submit"
            >
              Sign in
            </Button>
          </Box>
        </div>
      )}
    </>
  );
};

export default Login;
