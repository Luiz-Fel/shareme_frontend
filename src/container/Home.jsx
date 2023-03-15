import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { HiMenu, HiTrendingUp } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { Sidebar, UserProfile } from '../components/index.js';
import Pins from './Pins.jsx';
import { client } from '../client.js'
import { userQuery } from '../utils/data.js'
import logo from '../assets/logo.png'
import { fetchUser } from '../utils/fetchUser.js';

function Home() {

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const userInfo = fetchUser();
  const scrollRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const query = userQuery(userInfo?.sub);

    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  },[])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
    const handleScroll = debounce(() => {
      setOffset(scrollRef.current.scrollTop);
    }, 50);
    scrollRef.current.addEventListener('scroll', handleScroll);
    return () => scrollRef.current.removeEventListener('scroll', handleScroll);
    
    
  }, [])
  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-sceen flex-initial'>
        <Sidebar 
          user={user && user}
        />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className={`p-2 w-full flex flex-row justify-between items-center transition-shadow  ${offset > 0 ? 'shadow-lg' : ''}`}>
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(HiTrendingUp)} />
          <Link to='/'>
            <img src={logo} alt="logo" className='w-48' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-Image" className='w-16 rounded-full' />
          </Link>
        </div>
       {toggleSidebar && (
        <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
          <div className='absolute w-full flex justify-end items-center p-2'>
            <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
          </div>
          <Sidebar 
            user={user && user}
            closeToggle={() => setToggleSidebar(false)}
          />
        </div>
       )}
      </div>
       <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
          <Routes>
            <Route path='/user-profile/:userId' element={<UserProfile />} />
            <Route path='/profile/:userId' element={<UserProfile />} />
            <Route path='/*' element={<Pins user={user && user} />} />
          </Routes>
       </div>
    </div>
  )
}


export default Home;