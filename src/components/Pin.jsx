import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { AiTwotoneDelete } from 'react-icons/ai';

import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';

function Pin({ pin: { postedBy, image, _id, destination, save }}) {

  const [postHovered, setPostHovered] = useState(false);
  const userInfo = fetchUser();
  const navigate = useNavigate();
  const alreadySaved = !!(save?.filter((item) => item.postedBy._id === userInfo.aud))?.length;

  const savePin = (id) => {
    if(!alreadySaved) {

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: userInfo.aud,
          postedBy: {
            _type: 'postedBy',
            _ref: userInfo.aud,
          }
        }])
        .commit()
        .then(() => {
          window.location.reload();
        })
    }
  }

 

  return (
    <div classname='m-2'>
      <div
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-details/${_id}`)}
      >

        <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(500).url()} />
        {postHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2'
            style={{ height: '100%'}}
          >
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <a 
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark tex-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none '
                  href={`${image?.asset?.url}?dl=`} 
                  download 
                  onClick={(e) => e.stopPropagation()}
                  >
                   <MdDownloadForOffline className='' />
                </a>
              </div>
              {alreadySaved ? (
                <button 
                  type='button' 
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                  >
                 {save?.length} Saved
                </button>
              ) : (
                <button 
                  type='button' 
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  >
                  Save
                </button>
              )}
            </div>
           
          </div>
        )}
      </div>

    </div>
  )
}

export default Pin