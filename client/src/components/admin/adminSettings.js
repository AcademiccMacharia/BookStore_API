// import React, { useState } from "react";
// import "./sidecomponent.css";
// import * as AiIcons from "react-icons/ai";
// import book from "./images/book.png";
// import profile from "./images/profile.png";
// import { Link } from "react-router-dom";
// import { SidebarData } from "./sideBar";
// import { IconContext } from "react-icons/lib";
// import SingleBook from "./singleBook";

// const AdminSettings = () => {
//   const [sidebar, setSidebar] = useState(false);

//   const showsidebar = () => setSidebar(!sidebar);

//   return (
//     <>
//       <IconContext.Provider value={{ color: "white" }}>
//         <div className="admin-dashboard">
//           <h4>Admin dashboard</h4>
//           <div className="input">
//             <button>
//               <AiIcons.AiOutlineSearch />
//             </button>
//             <input type="text" placeholder="search something" />
//           </div>
//         </div>

//         <div className="All-books">
//           <SingleBook />
//           <SingleBook />
//           <SingleBook />
//           <SingleBook />
//           <SingleBook />
//         </div>
//         {/* <div className="navbar ">
 
//      <Link to='/' className= "menu-bars">
//      < FaIcons.FaHamburger onClick={showsidebar}/>
//      </Link>
//     </div> */

//     </>
//   );
// }

// export default AdminSettings;
