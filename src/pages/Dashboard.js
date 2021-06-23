import React, { useContext } from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";
import { useGlobalContext } from "../context/context";
const Dashboard = () => {
  const { githubUser, githubRepos, githubFollowers } = useGlobalContext();
  console.log(githubUser);
  console.log(githubRepos);
  console.log(githubFollowers);
  return (
    <main>
      <Navbar></Navbar>
      <Search></Search>
      <Info></Info>
      <User></User>
      <Repos></Repos>
    </main>
  );
};

export default Dashboard;
