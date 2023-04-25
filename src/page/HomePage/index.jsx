import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatToVND } from "../../utils/numberUtil";
import { getOrderRequest } from "../OrderPage/orderSlice";
import { getRestaurantRequest } from "../HomePage/restaurantSlice";
import { ACCOUNT, API_URL } from "../../utils/constant";
import "./index.css";
import axios from "axios";
const HomePage = () => {
 
  const staffData1 = JSON.parse(localStorage.getItem(ACCOUNT));
  // const staffData = {
  //   staffId: 8,
  //   staffFullName: "Đặng Tuấn Anh",
  //   staffEmail: "anhdt@gmail.com",
  //   staffAvatarUrl: "url-test v1",
  //   theAccountForStaff: {
  //     accountId: "staff_01",
  //     phoneNumber: "0835678111",
  //     password: "test123demo",
  //     roleId: 4,
  //     status: true,
  //   },
  //   theRestaurant: {
  //     restaurantId: 7,
  //     restaurantName: "TFS Nguyễn Văn Lượng",
  //   },
  //   staffActivityStatus: "available",
  //   staffStatus: true,
  // };
  const dispatch = useDispatch();
  const listOrder = useSelector((state) => state.orderManage.listOrder);
  const restaurant = useSelector((state) => state.restaurantManage.restaurant);

  useEffect(() => {
    dispatch(getOrderRequest(staffData1.staffId));
    dispatch(getRestaurantRequest(staffData1.theRestaurant.restaurantId));
  }, [dispatch]);


  const totalRevenue = () => {
    let total = 0;
    listOrder.forEach((item) => {
      total += item.totalPrice;
    });
    return formatToVND(total);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.inforBox}>
        <h2>Xin chào, {staffData1.staffFullName} </h2>
      </Box>
      <Box sx={styles.inforBox}>
        <Box sx={styles.contentBox}>
          <p style={styles.text}>Địa chỉ: </p>
        </Box>
        <Box sx={styles.contentBox}>
          <p>{restaurant.restaurantLocation}</p>
        </Box>
        <Box sx={styles.contentBox}>
          <p style={styles.text}>Số điện thoại chi nhánh: </p>
        </Box>
        <Box sx={styles.contentBox}>
          <p style={styles.text}>{restaurant.restaurantNumber} </p>
        </Box>
      </Box>
      <div className="order-page">
        <div className="order-item" style={{ width: "95%" }}>
          <div className="left">
            <h3 className="orderID">Doanh thu</h3>
            <h3 className="order-customer">{totalRevenue()} đ</h3>
          </div>
          <hr className="space-hr" />
          <div className="right">
            <h3 className="price">Tổng đơn hàng</h3>
            <h3
              className="order-customer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {listOrder.length}
            </h3>
          </div>
        </div>
      </div>
    </Box>
  );
};
const styles = {
  container: {
    width: "100%",
    padding: "0 16px 0 16px",
  },
  inforBox: {
    padding: "8px",
    border: "1px solid silver",
    borderRadius: "15px",
    margin: "16px 0 16px 0",
  },
  contentBox: {
    margin: "8px 0 0 0",
  },
  text: {},
};
export default HomePage;
