import React from 'react'

import SingleBook from './singleBook';
import * as AiIcons from 'react-icons/ai'
function Books() {
  return (
   <>
    <div className="admin-dashboard">
           <h4>Admin dashboard</h4>
          <div className="input">
            <button>
               <AiIcons.AiOutlineSearch />
             </button>
             <input type="text" placeholder="search something" />
           </div>
         </div>
         <div className="All-books">
           <SingleBook />
           <SingleBook />
           <SingleBook />
           <SingleBook />
           <SingleBook />
           <SingleBook />
           <SingleBook />
           <SingleBook />
        </div>
   </>
  )
}

export default Books;