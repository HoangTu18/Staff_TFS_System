import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
function Notification(props) {
  return (
    <div>
      <div className="title">
        <h1>Thông báo</h1>
      </div>
      <div className="noti-order">
        <div className="noti-order-item">
          <h3>Thông báo</h3>
          <p>Bạn có một đơn hàng mới cần xử lý, mã đơn hàng là 1069 </p>
          <p>25/4/2023 10:26</p>
        </div>
      </div>
    </div>
  );
}

export default Notification;
