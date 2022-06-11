import "./account.scss";
import { BsGoogle, BsFacebook } from "react-icons/bs";

const Register = ({data: {name, description, localSubmit, formText1, formText2, formText3, route}}) => {
  return (
    <div className="register-container">
      <div className="card">
        <form action="">
          <div className="form-title">
            <h2>{name}</h2>
          </div>
          <div className="form-description">
            <p>{description}</p>
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
            <button type="submit">{localSubmit}</button>
          </div>
          <div className="form-text"><hr /> {formText1} </div>
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
            {formText2}
            <strong>
              <a href={`/${route}`}>{formText3}</a>
            </strong>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
