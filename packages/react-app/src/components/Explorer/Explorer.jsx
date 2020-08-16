import React, { useContext } from "react";
import "./Explorer.scss";
import { StateContext } from "../../hooks";

function Explorer() {
  const { antReviewEventsArray } = useContext(StateContext);
  return (
    <div className="Explorer">
      <div></div>
    </div>
  );
}

export default Explorer;
