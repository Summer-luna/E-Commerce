import "./account.scss";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "./AuthContext";

const Login = () => {

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const [isAuth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  const changeHandle = (e) => {
    const {name, value} = e.target;
    setUser(preValue => {
      return {
        ...preValue,
        [name]: value
      }
    })
  }

  const login = async (e) => {
    e.preventDefault();
    const response = await axios.post('/login', user, {withCredentials: true});
    const statusCode = response.status;
    console.log(response);
    if(statusCode === 200){
      setAuth(true);
      navigate("/account", { state: { isAuth: true } });
    }else {
      setAuth(false);
    }
  }

  return (
      <div className="register-container">
        <div className="card">
          <form onSubmit={login}>
            <div className="form-title">
              <h2>Login</h2>
            </div>
            <div className="form-description">
              <p>Hey, Enter your details to get Sign in your account</p>
            </div>
            <div className="form-inputs">
              <input
                  type="email"
                  name="username"
                  id="email"
                  className="form-input"
                  placeholder="Enter Email"
                  value={user.username}
                  onChange={changeHandle}
              />
              <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-input"
                  placeholder="Enter Password"
                  value={user.password}
                  onChange={changeHandle}
              />
            </div>
            <div className="form-text"></div>
            <div className="form-button">
              <button type="submit">Sign in</button>
            </div>
            <div className="form-text">
              <hr /> or Sign in with
            </div>
            <div className="form-button">
              <button type="submit" className="google-btn social-btn">
                <BsGoogle className="social-icon" />
                Google
              </button>
            </div>
            <div className="form-button">
              <button type="submit" className="facebook-btn social-btn">
                <BsFacebook className="social-icon" />
                Facebook
              </button>
            </div>
            <div className="form-text">
              Don't have an account?
              <strong>
                <Link to="/signup">Create Now</Link>
              </strong>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Login;
