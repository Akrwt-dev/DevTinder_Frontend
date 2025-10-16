import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils.js/constant";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import { addFeed } from "../utils.js/feedSlice";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const feedPage = async () => {
    if (feed) return;
    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
    dispatch(addFeed(res.data));
  };
  useEffect(() => {
    feedPage();
  }, []);
  return (feed && (
    <div className="flex flex-col items-center mt-6 mb-20">
        <FeedCard user={feed[0]}/> 
    </div>
  ));
};

export default Feed;
