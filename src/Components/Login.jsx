import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils.js/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils.js/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogIn, setIsLogIn] = useState(true);
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
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
        firstName,
        lastName,
        emailId,
        password,
      },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Login failed");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="card card-dash bg-base-300 w-96">
          <div className="card-body my-10">
            <h2 className="card-title justify-center text-3xl">
              {isLogIn ? "Log-In" : "Sign-Up"}
            </h2>
            {!isLogIn && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-xl">
                    First Name
                  </legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input"
                    placeholder="First Name"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-xl">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input"
                    placeholder="Last Name"
                  />
                </fieldset>
              </>
            )}
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
              <button
                className="btn btn-primary"
                onClick={isLogIn ? handleLogIn : handleSignUp}
              >
                {isLogIn ? "Log In" : "Submit"}
              </button>
            </div>
            <p className="m-auto cursor-pointer py-2" onClick={() => setIsLogIn((prev) => !prev)}>
              {isLogIn ? "New user? Sign-Up" : "Existing User: Log-In"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
