import React, { useState, useEffect, useContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();
const GithubProvider = (props) => {
  return (
    <GithubContext.Provider value={{ rootUrl }}>
      {props.children}
    </GithubContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GithubContext);

export { GithubContext, GithubProvider };
