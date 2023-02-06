import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';

function Pin({ pin: { postedBy, image, _id, destination }}) {

  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const userInfo = fetchUser();

  const navigate = useNavigate();


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
              {alreadySaved?.length !== 0 ? (
                <button>
                  Saved
                </button>
              ) : (
                <button>
                  Save
                </button>
              )
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Pin