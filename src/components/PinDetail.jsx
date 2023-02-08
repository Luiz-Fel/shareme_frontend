import React, { useState, useEffect } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data.js';
import Spinner from './Spinner';

function PinDetail() {

  const [pins, setPins] = useState(null);
  const [pinDetails, setPinDetails] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();


  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query)
        .then((data) => {
          setPinDetails(data[0]);

          if(data[0]) {
            const otherquery = pinDetailMorePinQuery(data[0]);
            client.fetch(otherquery)
              .then((res) => setPins(res));
          }
      });
    }
  }

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetails) return <Spinner message='Loading pin...' />;
  console.log(pinDetails)
  return (
    <div className='flex xl:flex-row flex-col m-auto bg-white' style={{ maxWidth: '1500px', borderRadius: '32'}}>
      <div className='flex justify-center items-center md:items-start flex-initial'>
        <img 
          src={pinDetails?.image && urlFor(pinDetails.image).url()} 
          alt="user-post"
          className='rounded-t-3xl rounded-b-lg' 
        />
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <a 
              className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark tex-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none '
              href={`${pinDetails.image?.asset?.url}?dl=`} 
              download 
              onClick={(e) => e.stopPropagation()}
            >
                <MdDownloadForOffline className='' />
            </a>

          </div>
          <a href={pinDetails.destination} target=' blank' rel='noreferrer'>
            {pinDetails.destination}
          </a>
        </div>
        <div>
          <h1 className='text-4xl font-bold break-words mt-3'>
            {pinDetails.title}
          </h1>
          <p className='mt-3'>
            {pinDetails.about}
          </p>
        </div>
        <Link to={`/profile/${pinDetails.postedBy?._id}`} className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
          <img src={pinDetails.postedBy?.image} alt="user-image" className='w-8 h-8 rounded-full object-cover' />
          <p className='font-semibold capitalize'>{pinDetails.postedBy.username}</p>
        </Link>
        <h2 className='mt-5 text-2xl'>Comments</h2>
      </div>
    </div>
  )
}

export default PinDetail