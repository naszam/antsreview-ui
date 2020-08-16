import React, { useContext } from "react";
import "./Sidebar.scss";
import { ActionContext, StateContext } from "../../hooks";
import { Button } from "rimble-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faListAlt,
  faTachometerAlt,
  faUserAlt,
  faFaucet,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const { toggleModal, selectMenu } = useContext(ActionContext);
  const { selectedMenu } = useContext(StateContext);

  return (
    <div className="Sidebar">
      <Button icon="Add" iconpos="left" mr={3} className="create-issue">
        Issue AntReview
      </Button>
      <div
        className={`sidebar-item ${
          selectedMenu === "explorer" ? "selected" : ""
        }`}
        onClick={(e) => selectMenu("explorer")}
      >
        <span className="sidebar-item-main">
          <span className="sidebar-item-icon">
            <FontAwesomeIcon icon={faListAlt}></FontAwesomeIcon>
          </span>
          <span className="sidebar-item-title">Explorer</span>
        </span>
      </div>
      <div
        className={`sidebar-item ${
          selectedMenu === "dashboard" ? "selected" : ""
        }`}
        onClick={(e) => selectMenu("dashboard")}
      >
        <span className="sidebar-item-main">
          <span className="sidebar-item-icon">
            <FontAwesomeIcon icon={faTachometerAlt}></FontAwesomeIcon>
          </span>
          <span className="sidebar-item-title">Dashboard</span>
        </span>
      </div>
      <div
        className={`sidebar-item ${
          selectedMenu === "leaderboard" ? "selected" : ""
        }`}
        onClick={(e) => selectMenu("leaderboard")}
      >
        <span className="sidebar-item-main">
          <span className="sidebar-item-icon">
            <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon>
          </span>
          <span className="sidebar-item-title">Leaderboard</span>
        </span>
      </div>
      <div
        className={`sidebar-item ${
          selectedMenu === "profile" ? "selected" : ""
        }`}
        onClick={(e) => selectMenu("profile")}
      >
        <span className="sidebar-item-main">
          <span className="sidebar-item-icon">
            <FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon>
          </span>
          <span className="sidebar-item-title">Profile</span>
        </span>
      </div>
      <div
        className={`sidebar-item ${
          selectedMenu === "faucet" ? "selected" : ""
        }`}
        onClick={(e) => selectMenu("faucet")}
      >
        <span className="sidebar-item-main">
          <span className="sidebar-item-icon">
            <FontAwesomeIcon icon={faFaucet}></FontAwesomeIcon>
          </span>
          <span className="sidebar-item-title">Faucet</span>
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
