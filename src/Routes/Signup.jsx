import "./account.scss";
import axios from "axios";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "./AuthContext";


const Signup = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    let navigate = useNavigate();

    const [isAuth, setAuth] = useContext(AuthContext);

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
        const response = await axios.post('/signup', user, {withCredentials: true});
        const statusCode = response.status;

        if(statusCode === 200){
            setAuth(true);
            navigate("/account", { state: { isAuth: true } });
        }else {
            setAuth(false);
        }
    };

    return (
        <div className="register-container">
            <div className="card">
                <form onSubmit={submitHandler}>
                    <div className="form-title">
                        <h2>Create Account</h2>
                    </div>
                    <div className="form-description">
                        <p>Hey, Enter your details to get Sign up your account</p>
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
                        <button type="submit">Create</button>
                    </div>
                    <div className="form-text">
                        <hr /> or Sign up with
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
                        Have an account?
                        <strong>
                            <Link to="/login">Signin Now</Link>
                        </strong>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
