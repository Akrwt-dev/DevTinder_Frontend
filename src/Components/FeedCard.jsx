import React from "react";
import { DEFAULT_USER_IMG } from "../utils.js/constant";

const FeedCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoURL} = user;
  return (
    <div>
      <div className="card bg-base-300 max-w-80 shadow-sm">
        <figure>
          <img className="w-48 pt-5 "
            src={photoURL || DEFAULT_USER_IMG}
            alt="User Photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName} {lastName}</h2>
          <p>{age && gender && `${age} years old ${gender}`}</p>
          <p>{about}</p>
          <div className="card-actions justify-center p-2 ">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
