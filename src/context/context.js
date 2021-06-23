import React, { useState, useEffect, useContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();
const GithubProvider = (props) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [githubRepos, setGithubRepos] = useState(mockRepos);
  const [githubFollowers, setGithubFollowers] = useState(mockFollowers);
  const [rateLimit, setRateLimit] = useState(0);
  const [error, setError] = useState({ show: false, msg: "" });
  const [isLoading, setLoading] = useState(false);

  const fetchData = async (input) => {
    displayError();
    setLoading(true);
    try {
      const response = await fetch(`${rootUrl}/users/${input}`);
      const data = await response.json();
      if (data) {
        setGithubUser(data);
        // Fetch follower
        const responseFollower = await fetch(
          `${rootUrl}/users/${input}/followers`
        );
        const follower = await responseFollower.json();
        setGithubFollowers(follower);
        // Fetch repos
        const responseRepos = await fetch(
          `${rootUrl}/users/${input}/repos?per_page=20`
        );
        const repos = await responseRepos.json();
        setGithubRepos(repos);
      } else {
        displayError(true, "There are no use with that username");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    checkRequest();
  };

  const checkRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${rootUrl}/rate_limit`);
      const data = await response.json();
      console.log(data.rate.remaining);
      setRateLimit(data.rate.remaining);
      if (rateLimit === 0) {
        setError(true, "Sorry, you ran out of request per hour, try latter!");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const displayError = (show = false, msg = "") => {
    setError({ show: show, msg: msg });
  };

  useEffect(() => {
    checkRequest();
  }, []);

  const submitFormHandler = (input) => {
    fetchData(input);
  };

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        githubRepos,
        githubFollowers,
        submitFormHandler,
        rateLimit,
        error,
        isLoading,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GithubContext);

export { GithubContext, GithubProvider };
