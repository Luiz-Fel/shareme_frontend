import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

function Navbar({ searchTerm, setSearchTerm, user }) {
  const navigate = useNavigate();
  
  return (
    <div className='flex gap-2 md:gp-5 w-full mt-5 pb-7'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm '>
        <IoMdSearch fontSize={21} className='ml-1' />
        <input 
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder='Search'
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className='p-2 w-full bg-white outline-none'
        />
      </div>
      <div className='flex gap-3 justify-center items-center'>
        <Link to={`user-profile/${user?._id}`} className='hidden md:flex items-center justify-center'>
          {user && <img src={user.image} alt="user" className=' w-11 h-11 rounded-full mx-1'/>}
        </Link>
        <Link to={`create-pin`} className='bg-gray-800 text-white rounded-md w-10 h-10 flex justify-center items-center'>
          <IoMdAdd className='w-6 h-6 mx-2'/>
        </Link>
      </div>
    </div>
  )
}

export default Navbar