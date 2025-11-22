import React from "react";
import { BASE_URL, DEFAULT_USER_IMG } from "../utils.js/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils.js/feedSlice";

const FeedCard = ({ user }) => {
  const dispatch = useDispatch();
  if (!user) {
    return (
      <div className="text-gray-400 text-center mt-4">Loading feed...</div>
    );
  }
  const handleRequest = async ( status , _id) => {
    const res = await axios.post(
      BASE_URL + "/request/send/" + status+ "/" + _id,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(removeFeed(_id));
  };
  const {_id, firstName, lastName, age, gender, about, photoURL } = user;
  return (
    <div>
      <div className="card bg-base-300 max-w-80 shadow-sm">
        <figure>
          <img
            className="w-48 pt-5 "
            src={photoURL || DEFAULT_USER_IMG}
            alt="User Photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>{age && gender && `${age} years old ${gender}`}</p>
          <p>{about}</p>
          <div className="card-actions justify-center p-2 ">
            <button className="btn btn-primary" onClick={()=>{handleRequest("ignore",_id)}}>Ignore</button>
            <button className="btn btn-secondary" onClick={()=>{handleRequest("interested",_id)}}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
