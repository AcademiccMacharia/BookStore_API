import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="form">
    <form> 
        <h1>Log in</h1>
        <p>
            <label className="email" data-icon="e" > Enter your email: </label>
            <input id="username" name="username" required="required" type="text" placeholder="mymail@mail.com"/>
        </p>
        <p> 
            <label className="youpasswd" data-icon="p"> Enter your password: </label>
            <input name="password" required="required" type="password" placeholder="eg. X8df!90EO" /> 
        </p>
        <p className="login button"> 
            <input type="submit" value="Login" /> 
        </p>
        <p className="change_link">
            Not a member yet ?
            <Link to="/register">
            <span className="to_register">Join us</span>
            </Link>
        </p>
    </form>
</div>
  )
}

export default Login