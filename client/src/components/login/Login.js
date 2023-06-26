import React from 'react'
import './login.css'

const Login = () => {
  return (
    <div className="form">
    <form> 
        <h1>Log in</h1>
        <p>
            <label for="email" className="email" data-icon="e" > Enter your email: </label>
            <input id="username" name="username" required="required" type="text" placeholder="mymail@mail.com"/>
        </p>
        <p> 
            <label for="password" className="youpasswd" data-icon="p"> Enter your password: </label>
            <input id="password" name="password" required="required" type="password" placeholder="eg. X8df!90EO" /> 
        </p>
        <p class="login button"> 
            <input type="submit" value="Login" /> 
        </p>
        <p class="change_link">
            Not a member yet ?
            <a href="#toregister" class="to_register">Join us</a>
        </p>
    </form>
</div>
  )
}

export default Login