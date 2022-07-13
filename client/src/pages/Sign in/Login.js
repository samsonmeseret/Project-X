import { Button, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/Auth";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import "./login.css";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
const url = "http://localhost:4000/login";

const Login = () => {
  const [showPwd, setShowPwd] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { login } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState();

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
      const res = await axios.get("http://localhost:4000/me", {
        headers: { authorization: `Bearer ${token}` },
      });
      localStorage.setItem("whami", res.data.me.role);
      console.log(response.data.token);
      login(token);
    } catch (err) {
      console.log(err.response);
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
        setErrMsg("Please provid Email and Password!");
      } else if (err.response.status === 401) {
        setErrMsg("Invalid email or password");
      } else {
        setErrMsg("Login failed");
      }
    }
    navigate(from, { replace: true });
    setUser("");
    setPwd("");
  };
  return (
    <>
      <div className="login_container">
        <div className="login">
          <p ref={errRef}>{errMsg}</p>
          <div className="logo">
            <LockOutlinedIcon />
            <h1>
              <span>Heal</span> Eye
            </h1>
          </div>
          <div className="login_form">
            <form onSubmit={submitHanddler}>
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
                variant="standard"
                style={{
                  width: "20rem",
                }}
              />
              <TextField
                id="outlined"
                value={pwd}
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                label="Password"
                type={showPwd ? "text" : "password"}
                variant="standard"
                style={{
                  width: "20rem",
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPwd(!showPwd);
                      }}
                    >
                      {showPwd ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <Button
                style={{
                  background: "#8159f0",
                  padding: ".5rem 2rem",
                  width: "auto",
                  fontSize: "1rem",
                  color: "white",
                }}
                type="submit"
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
