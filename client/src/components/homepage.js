import React from 'react';
import read from '../assets/reading.svg';
import './homepage.css';
import { Link } from 'react-router-dom';

const homepage = () => {
    return (
        <div className='homepage'>
            <div className='navbar'>
                <h2>Soma <span>Soma.</span></h2>
                <div className='links'>
                  <ul>
                        <Link className="nav-links" to="/"><li>Home</li></Link>
                        <Link className="nav-links" to="/register"><li>Sign Up</li></Link>
                        <Link className="nav-links" to="/login"><li>Login</li></Link>
                  </ul>
                </div>
            </div>
            <div className='content'>
                <div className='hero-left'>
                    <h3><span>Soma Soma: </span>Tales, Tomes, and Tea</h3>
                    <p>Immerse Yourself in Literary Delights, Sip Some Tea, and Let the Pages Unfold!</p>
                    <Link to="/register">
                        <button className='home-btn'>Get Started</button>
                    </Link>
                </div>
                <div className='hero-right'>
                    <img src={read} alt='reading' />
                    </div>
            </div>
        </div>
    )
}

export default homepage