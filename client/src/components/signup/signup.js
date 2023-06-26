import React from 'react'
import './signup.css'

const Signup = () => {
  return (
    <div className="form">
    <form> 
        <h1>SignUp</h1>
        <p>
            <label className="fullname" > FullName: </label>
            <input required="required" type="text" placeholder="immah stuart"/>
        </p>

        <p>
            <label className="email" > Email: </label>
            <input required="required" type="email" placeholder="mymail@mail.com"/>
        </p>

        <p>
            <label className="address" > Address: </label>
            <input required="required" type="text" placeholder="Town-City"/>
        </p>

        <p>
            <label className="phone" > Phone Number: </label>
            <input required="required" type="text" placeholder="+254 700 000 000"/>
        </p>

        <p> 
            <label for="password" className="youpasswd" data-icon="p"> Enter your password: </label>
            <input id="password" name="password" required="required" type="password" placeholder="eg. X8df!90EO" /> 
        </p>

        <p> 
            <label for="password" className="youpasswd" data-icon="p"> Confirm password: </label>
            <input id="password" name="password" required="required" type="password" placeholder="eg. X8df!90EO" /> 
        </p>
        <p class="login button"> 
            <input type="submit" value="Signup" /> 
        </p>
        <p class="change_link">
            Already a member ?
            <a href="#toregister" class="to_register">Login</a>
        </p>
    </form>
</div>
  )
}

export default Signup