import React,{useState} from 'react'
import book from "./images/book.png";
import profile from "./images/profile.png";
import {Link, Outlet} from "react-router-dom";
import { IconContext } from "react-icons/lib";
import * as FaIcons from 'react-icons/fa';
import * as PiIcons from 'react-icons/pi';
import * as FiIcons from 'react-icons/fi';

import "./sidecomponent.css"




function SideBar() {
  const [sidebar, setSidebar] = useState(false);

  const showsidebar = () => setSidebar(!sidebar);
  return (
   <>

   <IconContext.Provider value={{ color: "white" }}>
  
     
   <div className="navbar ">
 
 <Link to='/' className= "menu-bars">
 < FaIcons.FaHamburger onClick={showsidebar}/>
 </Link>
</div>
   <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showsidebar}>
            <li className="logo">
              <img src={book} alt="book" /> SOMA SOMA
            </li>
            <li>
              <img src={profile} alt="admin" id="profile" />
            </li>
            <li className="admin-details">Admin Joy</li>
            <li className="navbar-toogle">
          
            </li>
              <li className='nav-text'><Link to="/books"><FaIcons.FaBook/> ALL BOOKS</Link></li>
              <li className='nav-text'><Link to="/users" ><PiIcons.PiUsersThree/>USERS</Link></li>
              <li className='nav-text'><Link to="/loans" ><FaIcons.FaDownload/>LOANS</Link></li>
              <li className='nav-text'><Link to="/settings" ><FiIcons.FiSettings/>ADD BOOK</Link></li>
              <li className='nav-text'><Link to="/settings" ><FiIcons.FiSettings/>DELETE BOOK</Link></li>
           
          </ul>
        </nav>
        <Outlet />
      
      </IconContext.Provider>
   </>
  )
}

export default SideBar



