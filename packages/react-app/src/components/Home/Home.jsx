import React from "react";
import "./Home.scss";
import { Redirect, Route } from "react-router-dom";
import Explorer from "../Explorer";
import Dashboard from "../Dashboard";
import Leaderboard from "../Leaderboard";
import Profile from "../Profile";
import Faucet from "../Faucet";

function Home() {
  return (
    <div className="Home">
      <Route path="/" exact render={() => <Redirect to="/explorer" />} />
      <Route path="/explorer" exact render={() => <Explorer />} />
      <Route path="/dashboard" exact render={() => <Dashboard />} />
      <Route path="/leaderboard" exact render={() => <Leaderboard />} />
      <Route path="/profile" exact render={() => <Profile />} />
      <Route path="/faucet" exact render={() => <Faucet />} />
    </div>
  );
}

export default Home;
