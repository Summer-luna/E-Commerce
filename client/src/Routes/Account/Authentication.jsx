import "./authentication.scss";
import axios from "axios";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext";

const Authentication = ({status}) => {

    const [isAuth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUser((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post(`/${status}`, user, {withCredentials: true});
        const data = await response.data;
        if(data.auth){
            setAuth(true);
            navigate("/account", { state: { isAuth: true } });
        }else {
            setAuth(false);
        }
    };

    const googleAuth = async () => {
        window.location = "https://mern-e-commerce-first-app-1.herokuapp.com/auth/google";
        //const res = await axios.get("https://mern-e-commerce-first-app-1.herokuapp.com/auth/google");
        //setAuth(res.data.auth);
        //navigate("/account");
    }

    return (
      <div className="register-container">
          <div className="card">
              <form onSubmit={submitHandler}>
                  <div className="form-title">
                      <h2>{status==="signup"? "Create Account" : "Login"}</h2>
                  </div>
                  <div className="form-description">
                      <p>
                          {status==="signup"? "Hey, Enter your details to get Sign up your account" : "Hey, Enter your details to get Sign in your account"}
                      </p>
                  </div>
                  <div className="form-inputs">
                      <input
                        type="email"
                        name="username"
                        id="email"
                        className="form-input"
                        placeholder="Enter Email"
                        onChange={changeHandler}
                        value={user.username}
                      />
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-input"
                        placeholder="Enter Password"
                        onChange={changeHandler}
                        value={user.password}
                      />
                  </div>
                  <div className="form-text"></div>
                  <div className="form-button">
                      <button type="submit">{status==="signup"? "Create" : "Signin"}</button>
                  </div>
                  <div className="form-text">
                      <hr /> {status==="signup"? "or Sign up with" : "or Sign in with"}
                  </div>
                  <div className="form-button">
                      <button type="button" className="google-btn social-btn" onClick={googleAuth}>
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
                      {status==="signup"? "Have an account?" : "Don't have an account?"}
                      <strong>
                          <Link to={status==="signup"? "/login":"/signup"}>{status==="signup"? "Signin Now" : "Create Now"}</Link>
                      </strong>
                  </div>
              </form>
          </div>
      </div>
    );
};

export default Authentication;
