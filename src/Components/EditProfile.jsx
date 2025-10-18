import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils.js/userSlice";
import FeedCard from "./FeedCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");

  const updateProfile = async () => {
    console.log("Save Profile button clicked"); // debug

    try {
      const res = await axios.patch(
  "http://localhost:4000/profile/edit",
  { firstName, lastName, age, gender, photoURL, about },
  { withCredentials: true } // important
);


      console.log("Response:", res);
      dispatch(addUser(res?.data?.data));
      setError(""); // clear error if successful
    } catch (err) {
      console.error("Update profile error:", err);
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-center m-5">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-3xl">Profile</legend>

          <label className="label">First Name</label>
          <input
            type="text"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">Gender</label>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              {gender || "Select Gender"}
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <a onClick={() => setGender("male")}>male</a>
              </li>
              <li>
                <a onClick={() => setGender("female")}>female</a>
              </li>
            </ul>
          </div>

          <label className="label">Age</label>
          <input
            type="text"
            className="input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label">Photo URL</label>
          <input
            type="text"
            className="input"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />

          <label className="label">About</label>
          <textarea
            className="textarea"
            placeholder="Bio"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>

          <button className="btn btn-accent mt-4" onClick={updateProfile}>
            Save Profile
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </fieldset>
      </div>

      <div className="m-5 mt-32">
        <FeedCard user={{ firstName, lastName, age, gender, about, photoURL }} />
      </div>
    </div>
  );
};

export default EditProfile;
