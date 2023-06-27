import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import "./signup.css";

const Signup = () => {
  const [inputs, setInputs] = useState({
    Name: "",
    Email: "",
    Address: "",
    ContactNumber: "",
    Password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const schema = Joi.object({
      Name: Joi.string().min(3).required().messages({
        'string.base': 'Full name should be a string',
        'string.empty': 'Full name is required',
        'string.min': 'Full name should have a minimum of {#limit} characters',
      }),
      Address: Joi.string().required().min(5).max(30).messages({
        'string.base': 'Address should be a string',
        'string.empty': 'Address is required',
        'string.min': 'Address should have a minimum of {#limit} characters',
        'string.max': 'Address should have a maximum of {#limit} characters',
      }),
      ContactNumber: Joi.string().required().max(16).messages({
        'string.base': 'Contact Number should be a string',
        'string.empty': 'Contact Number is required',
        'string.max': 'Contact Number should have a maximum of {#limit} characters',
      }),
      Email: Joi.string().required().messages({
        'string.base': 'Email should be a valid email address',
        'string.empty': 'Email is required',
      }),
      Password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).messages({
        'string.base': 'Password should be a string',
        'string.empty': 'Password is required',
        'string.pattern.base': 'Password should contain alphanumeric characters (uppercase, lowercase, and digits) and have a length between 6 and 30 characters',
      }),
      confirm_password: Joi.string().valid(Joi.ref('Password')).messages({
        'string.empty': 'Please confirm your password',
        'any.only': 'Confirmed password should match the value of Password',
      }),
    }).with('Password', 'confirm_password');
    
    

    const { error } = schema.validate(inputs, { abortEarly: false });

    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post("http://localhost:4040/members", inputs);
  
        if (response.data.success) {
          // Member created successfully
          navigate("/login");
        } else {
          // Check if an account with the email already exists
          if (response.data.error === "An account with this email already exists") {
            setErrors({ Email: "An account with this email already exists" });
          } else {
            // Handle other error cases
            setErrors({ general: response.data.error });
          }
        }
      } catch (err) {
        // Handle other error cases
        setErrors({ general: err.message });
      }
    }
  };
  return (
    <div className="form">
      <form>
        <h1>SignUp</h1>
        <p>
          <label className="fullname"> FullName* </label>
          <input
            required="required"
            type="text"
            placeholder="immah stuart"
            name="Name"
            value={inputs.Name}
            onChange={handleChange}
          />
          {errors.Name && <span className="error">{errors.Name}</span>}
        </p>

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
          <label className="address"> Address: </label>
          <input
            required="required"
            type="text"
            placeholder="Town-City"
            name="Address"
            value={inputs.Address}
            onChange={handleChange}
          />
          {errors.Address && <span className="error">{errors.Address}</span>}
        </p>

        <p>
          <label className="phone"> Phone Number* </label>
          <input
            required="required"
            type="text"
            placeholder="+254 700 000 000"
            name="ContactNumber"
            value={inputs.ContactNumber}
            onChange={handleChange}
          />
          {errors.ContactNumber && (
            <span className="error">{errors.ContactNumber}</span>
          )}
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

        <p>
          <label className="youpasswd" data-icon="p">
            Confirm password*
          </label>
          <input
            required="required"
            type="password"
            placeholder="eg. X8df!90EO"
            name="confirm_password"
            value={inputs.confirm_password}
            onChange={handleChange}
          />
          {errors.confirm_password && (
            <span className="error">{errors.confirm_password}</span>
          )}
        </p>

        {errors.general && <div className="error">{errors.general}</div>}
        <p className="login button">
          <input onClick={handleClick} type="submit" value="Signup" />
        </p>
        <p className="change_link">
          Already a member ?
          <Link to="/login">
            <span className="to_register">Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
