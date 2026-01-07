import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils.js/constant";
import { connect, useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils.js/connectionSlice";
import { Link } from "react-router";

const Connections = () => {
  const myConnection = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const yourConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnection(res.data.data));
  };
  useEffect(() => {
    yourConnections();
  }, []);

  if (!myConnection) return;

  if (myConnection.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
      {myConnection?.map((connect) => {
        const { _id, photoURL, firstName, lastName, gender, age, skills } =
          connect;
        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img className="w-16 rounded-full" src={photoURL} alt="user" />
            </div>
            <div className="mx-4">
              <p className="font-bold text-left">
                {firstName} {lastName}
              </p>
              <p>{age && gender && `${age} years old ${gender}`}</p>
            </div>
            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
