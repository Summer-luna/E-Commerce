import "./account.scss";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";

const Login = () => {
  return (
      <div className="register-container">
        <div className="card">
          <form>
            <div className="form-title">
              <h2>Login</h2>
            </div>
            <div className="form-description">
              <p>Hey, Enter your details to get Sign in your account</p>
            </div>
            <div className="form-inputs">
              <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter Email"
              />
              <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-input"
                  placeholder="Enter Password"
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
