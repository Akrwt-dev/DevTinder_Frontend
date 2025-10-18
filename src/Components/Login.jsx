import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils.js/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils.js/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("aman@gmail.com");
  const [password, setPassword] = useState("Aaaa@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogIn = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Login failed");
    }
  };
  return (
    <>
    <div className="flex justify-center items-center h-screen">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body my-10">
          <h2 className="card-title justify-center text-3xl">Log-in</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-xl">Email-ID</legend>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input"
              placeholder="Email Id"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-xl">Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Password"
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={handleLogIn}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default Login;
