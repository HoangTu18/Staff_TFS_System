import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import "./index.css";
import { dateCurrent } from "../../../utils/DateUtil";
import { useDispatch, useSelector } from "react-redux";
import { formatToVND } from "../../../utils/numberUtil";
import {
  addToCart,
  decreaseCart,
  getTotals,
  deleteCart,
} from "../../MenuPage/cartSlice";
import { getRestaurantRequest } from "../../HomePage/restaurantSlice";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import { ACCOUNT, API_URL } from "../../../utils/constant";
import { insertOrderRequest } from "../orderSlice";
import axios from "axios";

const CreateOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [payment, setPayment] = useState("cash");
  const [isDone, setIsDone] = useState(true);
  const staffData1 = JSON.parse(localStorage.getItem(ACCOUNT));
  const cart = useSelector((state) => state.cart);
  const restaurant = useSelector((state) => state.restaurantManage.restaurant);
  const listOrder = useSelector((state) => state.orderManage.listOrder);
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleFullName = (event) => {
    setFullName(event.target.value);
  };
  const listPayment = [
    {
      value: "cash",
      name: "Thanh toán tiền mặt",
      icon: require("../../../assets/icon/cash.png"),
    },
    {
      value: "ZaloPay",
      name: "Thanh toán bằng ZaloPay",
      icon: require("../../../assets/icon/zalo.png"),
    },
  ];

  const handleIncrease = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrease = (item) => {
    dispatch(decreaseCart(item));
  };

  const handleZaloPayment = (order) => {
    setIsDone(false);
    axios
      .get(API_URL + "/orders")
      .then((res) => {
        let maxId = Math.max(...res.data.map((item) => item.id));
        let zaloPayOrder = {
          id: maxId + 1,
          totalPrice: cart.cartTotalAmount,
          totalQuantity: 2,
        };
        axios
          .post(API_URL + "/orders/zaloPay", zaloPayOrder)
          .then((response) => {
            axios
              .get(API_URL + "/orders/checkPayment/" + response.data.apptransid)
              .then((zaloRes) => {
                setIsDone(true);
                navigate("/zalopayment", {
                  state: {
                    order: order,
                    paymentResponse: response.data,
                    zaloResponse: zaloRes.data,
                    zaloPayOrder: zaloPayOrder,
                  },
                });
                console.log(response.data);
              });
          })
          .catch((err) => {
            setIsDone(true);
            console.log(err);
          });
      })
      .catch((error) => {
        if (error.response) {
          setIsDone(true);
          console.lo(error.response.data);
        }
      });

    let url = API_URL + "/orders/checkPayment/";
    // navigate("/zalopayment", {order: item});
  };

  const handleDeleteCart = (payload) => {
    dispatch(insertOrderRequest(payload));
    dispatch(deleteCart());
    navigate("/home");
  };

  const handleCreate = () => {
    const data = [];
    if (cart.cartItems.length > 0) {
      cart.cartItems.forEach((item) => {
        data.push({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          subTotal: item.price * item.quantity,
          image: item.imgUrl,
        });
      });
      const payload = {
        id: 0,
        paymentMethod: payment,
        customerName: fullName,
        customerPhoneNumber: phone,
        customerId: 16,
        restaurantId: restaurant.restaurantId,
        staffId: staffData1.staffId,
        itemList: data,
      };
      payment === "cash"
        ? handleDeleteCart(payload)
        : handleZaloPayment(payload);
      // dispatch(checkoutCart());
    } else {
      navigate("/menu");
    }
  };

  useEffect(() => {
    dispatch(getTotals());
    dispatch(getRestaurantRequest(staffData1.theRestaurant.restaurantId));
  }, [cart]);

  return (
    <Box
      sx={{
        width: "100%",
        paddingBottom: "50px",
        position: "relative",
      }}
    >
      <div className="order-page">
        <div className="order-title">
          <div className="order-title-detail">
            {/* <img
              src="/images/back-icon.svg"
              alt=""
              onClick={() => {
                navigate("/order");
              }}
            /> */}
            <h2>Tạo đơn hàng</h2>
          </div>
        </div>
        <div className="order-calender">
          <p className="date">Ngày tạo đơn: {dateCurrent()}</p>
        </div>
        <div className="order-item">
          <div className="left">
            <h3 className="orderID">Tổng tiền</h3>
            <h3 className="order-customer">
              {formatToVND(cart.cartTotalAmount)} VNĐ
            </h3>
          </div>
          <hr className="space-hr" />
          <div className="right">
            <h3 className="price">Số sản phẩm</h3>
            <h3 className="order-customer">{cart.cartItems.length}</h3>
          </div>
        </div>
        <div className="order-calender">
          <p className="date">Khách hàng</p>
        </div>
        <div className="order-item">
          <PersonIcon className="icon" />
          <input
            className="phonenumber-customer"
            placeholder="Tên khách hàng"
            type="text"
            id="fullName"
            name="fullName"
            onChange={handleFullName}
          />
        </div>
        <div className="order-item">
          <PhoneAndroidIcon className="icon" />
          <input
            className="phonenumber-customer"
            placeholder="Số điện thoại"
            type="number"
            id="phone"
            name="phone"
            onChange={handlePhone}
          />
        </div>
        <div className="order-calender">
          <p className="date">Phương thức thanh toán</p>
        </div>
        {listPayment.map((item, index) => {
          return (
            <div
              className="order-item"
              onClick={() => {
                setPayment(item.value);
              }}
              key={index}
              style={
                payment === item.value
                  ? { borderColor: "red", borderWidth: 1.5 }
                  : null
              }
            >
              <img
                src={item.icon}
                alt="text"
                style={{ height: 35, width: 35, marginRight: 16 }}
              />
              <span
                style={
                  payment === item.value
                    ? { fontWeight: "900", fontSize: 14 }
                    : { fontWeight: "500" }
                }
              >
                {item.name}
              </span>
            </div>
          );
        })}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <div className="left">
            <h3 className="orderID">Danh sách sản phẩm</h3>
          </div>
          <div className="right">
            <button
              className="btn btn-danger"
              style={{
                backgroundColor: "#D83A3A",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25))",
              }}
              onClick={() => {
                navigate("/menu");
              }}
            >
              Thêm món
            </button>
          </div>
        </div>
        {cart.cartItems.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                width: "100%",
              }}
            >
              <div
                className="order-item"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="left" style={{ display: "flex" }}>
                  <img src={item.imgUrl} alt="" style={{ width: "50px" }} />
                  <div style={{ marginLeft: "7px" }}>
                    <h3>{item.foodName}</h3>
                    <p>{formatToVND(item.price)}/ 1 món</p>
                  </div>
                </div>
                <div className="right" style={{ alignItems: "end" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <RemoveIcon
                      style={{ fontSize: "14px", marginTop: "3px" }}
                      onClick={() => handleDecrease(item)}
                    />
                    <p
                      style={{
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        fontSize: "15px",
                      }}
                    >
                      {item.quantity}
                    </p>
                    <AddIcon
                      style={{ fontSize: "14px", marginTop: "3px" }}
                      onClick={() => handleIncrease(item)}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="create-order"
        style={{
          position: "fixed",
          bottom: 0,
          marginBottom: 55,
          backgroundColor: "white ",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "rgba(251, 251, 251, 0.95",
            padding: "10px",
            margin: "10px",
            borderRadius: "5px",
          }}
        >
          <div className="left">
            <p style={{ fontWeight: "bold" }}> Tạm Tính</p>
          </div>
          <div className="rigth" style={{ color: "#D83A3A" }}>
            {formatToVND(cart.cartTotalAmount)} VNĐ
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "20px",
            paddingBottom: 8,
          }}
        >
          {isDone ? (
            <button
              className="btn btn-danger"
              style={{
                backgroundColor: "#D83A3A",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "15px",
                fontWeight: "700",
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25))",
              }}
              onClick={() => handleCreate()}
            >
              Tạo đơn hàng
            </button>
          ) : (
            <button
              disabled={true}
              className="btn btn-danger"
              style={{
                backgroundColor: "#ff9b9b",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "15px",
                fontWeight: "700",
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25))",
              }}
              onClick={() => handleCreate()}
            >
              <CircularProgress color="inherit" size={16} /> Đang tạo đơn
              hàng...
            </button>
          )}
        </div>
      </div>
    </Box>
  );
};

export default CreateOrder;
