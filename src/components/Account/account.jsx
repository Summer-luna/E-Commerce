import "./account.scss";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";

const Register = ({
  data: {
    name,
    description,
    localSubmit,
    formText1,
    formText2,
    formText3,
    route,
  },
}) => {
  const [user, setUser] = useState({
    email: "",
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
    console.log("submitted");

    const response = await axios.post('/signup', user);

    const data = await response.data;
    console.log(data);
  };

  return (
    <div className="register-container">
      <div className="card">
        <form onSubmit={submitHandler}>
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
              onChange={changeHandler}
              value={user.email}
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
            <button type="submit">{localSubmit}</button>
          </div>
          <div className="form-text">
            <hr /> {formText1}{" "}
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
