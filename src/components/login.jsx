import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

export default function Login() {
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
     <div className='relative w-full h-full'>
      <video 
        src={shareVideo}
        type="video/mp4"
        autoPlay
        loop
        controls={false}
        muted 
        className='w-full h-full object-cover'
      />
      <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'>
        <div className='p-6'>
          <img src={logo} alt="shareme-logo" width='130px' />
        </div>
        <div className='shadow-2xl'>
          <GoogleLogin
            onSuccess={responseGoogle => {
              localStorage.setItem('user', JSON.stringify(responseGoogle.profileObj));

              const {name, googleId, imageUrl} = responseGoogle.profileObj;

              const doc = {
                _id: googleId,
                _type: 'user',
                userName: name,
                image: imageUrl,
              }
            }}
            onFailure={responseGoogle => console.log(responseGoogle)}
          />
        </div>
      </div>
     </div>
    </div>
  )
}
