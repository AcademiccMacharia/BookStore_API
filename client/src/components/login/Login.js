import React from "react";
import { useState } from "react";
import axios from 'axios';
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({
    Email: "",
    Password: "",
  });

  console.log(inputs)

  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4040/members/login", inputs);
      navigate("/user")
    } catch (error) {
      setErr(err);
    }
  };

  console.log(err);
  
  return (
    <div className="form">
      <form>
        <h1>Log in</h1>
        <p>
          <label className="email"> Enter your email: </label>
          <input
            required
            type="email"
            placeholder="mymail@mail.com"
            name="Email"
            onChange={handleChange}
          />
        </p>
        <p>
          <label className="youpasswd"> Enter your password: </label>
          <input
            required
            type="password"
            placeholder="eg. X8df!90EO"
            name="Password"
            onChange={handleChange}
          />
        </p>
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
