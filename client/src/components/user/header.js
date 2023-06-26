import React from 'react';
import Books from './books';
import user from '../../assets/w-user.png';

const header = () => {
  return (
    <div className='all-books'>
    <div className='header'>
    <h3>User Dashboard</h3>
    <div className='search-input'>
    <span><input placeholder='Search something...' type='text' /></span>
    </div>
    <div className='profile'>
    <img src={user} alt='user' />
    </div>
</div>
<div className='panel-body'>
    <Books />
</div>
</div>
  )
}

export default header