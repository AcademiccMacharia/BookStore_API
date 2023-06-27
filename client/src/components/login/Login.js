import React from "react";
import { useState } from "react";
import axios from "axios";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";

const Login = () => {
  const [inputs, setInputs] = useState({
    Email: "",
    Password: "",
  });

  console.log(inputs);

  const [err, setErr] = useState(null);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const schema = Joi.object({
      Email: Joi.string().required().messages({
        "string.base": "Email should be a valid email address",
        "string.empty": "Email is required",
      }),
      Password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
        .messages({
          "string.base": "Password should be a string",
          "string.empty": "Password is required",
          "string.pattern.base":
            "Password should contain alphanumeric characters (uppercase, lowercase, and digits) and have a length between 6 and 30 characters",
        }),
    });

    const { error } = schema.validate(inputs, { abortEarly: false });

    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
    } else {
      try {
        await axios.post("http://localhost:4040/members/login", inputs);
        navigate("/user");
      } catch (error) {
        setErrors({ general: err.message });
      }
    }
  };

  console.log(err);

  return (
    <div className="form">
      <form>
        <h1>Log in</h1>
        <p>
          <label className="email"> Email* </label>
          <input
            required="required"
            type="email"
            placeholder="mymail@mail.com"
            name="Email"
            value={inputs.Email}
            onChange={handleChange}
          />
          {errors.Email && <span className="error">{errors.Email}</span>}
        </p>
        <p>
          <label className="youpasswd"> Enter your password* </label>
          <input
            required="required"
            type="password"
            placeholder="eg. X8df!90EO"
            name="Password"
            value={inputs.Password}
            onChange={handleChange}
          />
          {errors.Password && <span className="error">{errors.Password}</span>}
        </p>

        {errors.general && <div className="error">{errors.general}</div>}
        <p className="login button">
          <input onClick={handleClick} type="submit" value="Login" />
        </p>
        <p className="change_link">
          Not a member yet ?
          <Link to="/register">
            <span className="to_register">Join us</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
