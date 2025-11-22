import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils.js/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils.js/requestSlice";

const Request = () => {
  const myRequest = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const yourRequest = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });


    dispatch(addRequest((res.data.data)));
  };

  const reviewRequest = async (status, _id) => {
    try {
      const response = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch(error) {
      console.error(" failed", error);
    }
  };

  useEffect(() => {
    yourRequest();
  }, []);

  if (!myRequest) return;

  if (myRequest.length === 0) return <h1 className="flex justify-center mt-10">No Request Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Recieved Request</h1>

      {myRequest.map((req) => {
        const { _id, photoURL, firstName, lastName, gender, age } = req.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto items-center"
          >
            <div>
              <img className="w-16 rounded-full" src={photoURL} alt="user" />
            </div>
            <div className="mx-6 text-left">
              <p className="font-bold">
                {firstName} {lastName}
              </p>
              <p>{age && gender && `${age} years old ${gender}`}</p>
            </div>
            <div className="mx-36">
              <button
                className="btn btn-primary mx-1"
                onClick={() => {
                  reviewRequest("rejected", req._id);
                }}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-1"
                onClick={() => {
                  reviewRequest("accepted", req._id);
                }}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
