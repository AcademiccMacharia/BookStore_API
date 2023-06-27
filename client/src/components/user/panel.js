import React, { useState, createContext } from 'react';
import bkimg from '../../assets/w-book.png';
import fimg from '../../assets/image.jpeg';

import borrowing from '../../assets/w-borrow.png';
// import returning from '../../assets/w-return.png';
import loaning from '../../assets/w-loaned.png';
// import settings from '../../assets/settings.png';
import { Link, Outlet } from 'react-router-dom';


const ThemeContext = createContext();

const Panel = () => {
    const [theme, setTheme] = useState('dark');
    const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    return (
        <ThemeContext.Provider value={theme}>
            <div className={`user-page ${theme}`}>
                <div className='side-panel'>
                    <div className='side-panel_header'>
                        <h2>SOMA SOMA</h2>
                    </div>
                    <div className='side-profile'>
                        <img src={fimg} className="fimg" alt='face' />
                        <p>Uncle Ben</p>
                    </div>
                    <div className='side-panel_items'>
                        <ul className="side-panel_list">
                           <Link className="panel-links" to='/'> <li className='activo'> <img src={bkimg} className='icons' alt='book' /> Available Books</li> </Link>

                            <Link className="panel-links" to='/borrow'><li> <img src={borrowing} className='icons' alt='book' /> Borrowed Books</li></Link>
                            <Link className="panel-links" to='/loans'><li> <img src={loaning} className='icons' alt='book' /> Settings</li></Link>

                            <Link className="panel-links" to='/borrow'><li> <img src={loanimg} className='icons' alt='book' /> Borrowed Books</li></Link>
                            <Link className="panel-links" to='/loans'><li> <img src={settingimg} className='icons' alt='book' /> Settings</li></Link>

                        </ul>
                        <button className="btn-e"onClick={toggleTheme}>Toggle Theme</button>
                    </div>
                </div>
                <Outlet />
                {/* <div className='panel-header'>
                    <Header />
                </div> */}
            </div>
            </ThemeContext.Provider>
    )
}

export default Panel