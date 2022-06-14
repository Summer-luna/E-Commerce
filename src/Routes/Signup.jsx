import "./account.scss";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
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
        const response = await axios.post('/signup', user);
        const finalData = await response.data;
        console.log(finalData);
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
