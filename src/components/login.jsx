import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';

import { client } from '../client.js'
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

function Login() {
  const navigate = useNavigate();
  const cookies = new Cookies();

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
          <img src={logo} alt="sharenow-logo" width='130px' />
        </div>
        <div className='shadow-2xl'>
          <GoogleLogin
            onSuccess={responseGoogle => {
              const data = jwt_decode(responseGoogle.credential);
              cookies.set('user', JSON.stringify(data), { path: '/', maxAge: 36000000 });

              const {name, sub, picture} = data;

              const doc = {
                _id: sub,
                _type: 'user',
                username: name,
                image: picture,
              }
              client.createIfNotExists(doc).then(() => {

                navigate('/', { replace: true });
              })
            }}
            onError={responseGoogle => console.log(responseGoogle)}
          />
        </div>
      </div>
     </div>
    </div>
  )
}

export default Login