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

  return (
    <GithubContext.Provider
      value={{ githubUser, githubRepos, githubFollowers }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GithubContext);

export { GithubContext, GithubProvider };
