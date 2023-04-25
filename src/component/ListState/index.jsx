import React, { useState } from "react";
import { formatStringToDate } from "../../utils/DateUtil";
import State from "../State";
import "./index.scss";
function StateList(props) {
  const ONPROGRESS = "on-progress";
  const NOTYET = "not-yet";
  const SUCCESS = "success";

  let pending = NOTYET;
  let accept = NOTYET;
  let delivery = NOTYET;
  let done = NOTYET;
  let deny = NOTYET;

  const handleState = () => {
    switch (props.status) {
      case "pending":
        pending = SUCCESS;
        accept = ONPROGRESS;
        return;
      case "accept":
        pending = SUCCESS;
        accept = SUCCESS;
        delivery = ONPROGRESS;
        return;
      case "delivery":
        pending = SUCCESS;
        accept = SUCCESS;
        delivery = SUCCESS;
        done = ONPROGRESS;
        return;
      case "done":
        pending = SUCCESS;
        accept = SUCCESS;
        delivery = SUCCESS;
        done = SUCCESS;
        return;
      case "deny":
        deny = SUCCESS;
        return;
      default:
    }
  };
  handleState();
  return (
    <div className="state-list">
      <State
        time={formatStringToDate(props.orderDate.split("T")[0])}
        state={pending}
        title={"Chờ xác nhận"}
      />
      <State
        time={formatStringToDate(props.receiveTime.split("T")[0])}
        state={accept}
        title={"Xác nhận"}
      />
      <State
        time={formatStringToDate(props.deliveryDate.split("T")[0])}
        state={delivery}
        title={"Giao hàng"}
      />
      <State
        // time={formatStringToDate(props.orderDate.split("T")[0])}
        state={done}
        title={"Hoàn tất"}
      />
      {/* <State
        // time={formatStringToDate(props.orderDate.split("T")[0])}
        state={deny}
        title={"Huỷ"}
      /> */}
    </div>
  );
}

export default StateList;
