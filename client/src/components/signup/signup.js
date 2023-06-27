import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const Signup = () => {
  const [inputs, setInputs] = useState({
    Name: '',
    Email: '',
    Address: '',
    ContactNumber: '',
    Password: '',
    confirm_password: '',
    
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4040/members', inputs);
      navigate("/login")
    } catch (error) {
      setErr(err);
    }
  };

  console.log(err);

  return (
    <div className="form">
      <form>
        <h1>SignUp</h1>
        <p>
          <label className="fullname"> FullName: </label>
          <input
            required="required"
            type="text"
            placeholder="immah stuart"
            name="Name"
            onChange={handleChange}
          />
        </p>

        <p>
            <label className="email" > Email: </label>
            <input required="required" type="email" placeholder="mymail@mail.com" name='Email' onChange={handleChange}/>
        </p>

        <p>
            <label className="address" > Address: </label>
            <input required="required" type="text" placeholder="Town-City" name='Address' onChange={handleChange}/>
        </p>

        <p>
            <label className="phone" > Phone Number: </label>
            <input required="required" type="text" placeholder="+254 700 000 000" name='ContactNumber' onChange={handleChange}/>
        </p>

        <p> 
            <label className="youpasswd" data-icon="p"> Enter your password: </label>
            <input required="required" type="password" placeholder="eg. X8df!90EO" name='Password' onChange={handleChange}/> 
        </p>

        <p> 
            <label className="youpasswd" data-icon="p"> Confirm password: </label>
            <input required="required" type="password" placeholder="eg. X8df!90EO" name='confirm_password' onChange={handleChange}/> 
        </p>
        <p className="login button"> 
            <input onClick={handleClick} type="submit" value="Signup" /> 
        </p>
        <p className="change_link">
          Already a member ?<Link to="/login"><span className="to_register">Login</span></Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;