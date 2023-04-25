import React from "react";
import "./index.scss";
function State({ title, state, time }) {
  const generateIcon = (state) => {
    switch (state) {
      case "success":
        return <img src="/images/check-icon.svg" alt="" />;
      case "on-progress":
        return <img src="/images/info-icon.svg" alt="" />;
      case "not-yet":
        return <img src="/images/outline-icon.svg" alt="" />;
      default:
    }
  };

  return (
    <div className="state">
      <div className="state__title">{title}</div>
      <div className={`state__icon ${state}`}>{generateIcon(state)}</div>
      <div className="state__time">{time}</div>
    </div>
  );
}

export default State;
