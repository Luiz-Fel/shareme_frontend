import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { AiTwotoneDelete, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";

import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";

function Pin({
  pin: { postedBy, image, _id, destination, save, saveCount, commentsCount },
}) {
  const [postHovered, setPostHovered] = useState(false);
  const userInfo = fetchUser();
  const navigate = useNavigate();
  const alreadySaved = !!save?.filter(
    (item) => item.postedBy._id === userInfo?.sub
  )?.length;

  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: userInfo?.sub,
            postedBy: {
              _type: "postedBy",
              _ref: userInfo?.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const unSavePin = (id) => {
    if (alreadySaved) {
      client
        .patch(id)
        .unset(["save[-1]"])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="m-2">
      <div>
        <div
          className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
          onMouseEnter={() => setPostHovered(true)}
          onMouseLeave={() => setPostHovered(false)}
          onClick={() => navigate(`/pin-detail/${_id}`)}
        >
          <img
            className="rounded-lg w-full"
            alt="user-post"
            src={urlFor(image).width(500).url()}
          />
          {postHovered && (
            <div
              className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2"
              style={{ height: "100%" }}
            >
              <div className="flex justify-end items-center gap-2 w-full">
                {postedBy?._id === userInfo?.sub && (
                    <button
                      type="button"
                      className="bg-white opacity-70 hover:opacity-100 text-dark font-bold p-2 text-base rounded-3xl hover:shadow-md outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePin(_id);
                      }}
                    >
                      <AiTwotoneDelete />
                    </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className=" mt-3 mb-7 flex items-center justify-between">
        <Link
          to={`/profile/${postedBy?._id}`}
          className="flex gap-2 items-center"
        >
          <img
            src={postedBy?.image}
            alt="user-image"
            className="w-8 h-8 rounded-full object-cover"
          />
          <p className="font-semibold capitalize">{postedBy.username}</p>
        </Link>
        <div className="flex justify-end gap-3 items-center">
          {alreadySaved ? (
            <div className="flex gap-1 items-center">
              <p className="font-bold text-black">
                {saveCount ? saveCount : "0"}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  unSavePin(_id);
                }}
              >
                <AiFillHeart className="text-red-500 text-xl md:text-2xl" />
              </button>
            </div>
          ) : (
            <div className="flex gap-1 items-center">
              <p className="font-bold text-black">
                {saveCount ? saveCount : "0"}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  savePin(_id);
                  console.log("save");
                }}
              >
                <AiOutlineHeart className="text-black text-xl md:text-2xl" />
              </button>
            </div>
          )}
          <div className="flex gap-1 items-center">
            <p className="font-bold text-black">
              {commentsCount ? commentsCount : "0"}
            </p>
            <Link to={`/pin-detail/${_id}`}>
              <BiMessageRounded className=" text-black text-xl md:text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pin;
