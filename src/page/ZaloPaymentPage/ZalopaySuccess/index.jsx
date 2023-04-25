import { Box } from "@mui/material";
import Lottie from "lottie-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteCart } from "../../MenuPage/cartSlice";
import { insertOrderRequest, } from "../../OrderPage/orderSlice";

import successIcon from "./79952-successful.json";
const ZalopaySuccess = () => {
    const {state} = useLocation();
    const {order} = state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(insertOrderRequest(order))
    dispatch(deleteCart())
  },[])
  return (
    <Box
      style={{
        height: "100vh",
        display: "block",
        justifyContent: "center",
      }}
    >
      <Lottie
        loop={false}
        animationData={successIcon}
        autoPlay
        style={{ height: "40vh", padding: -100 }}
      />
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: 22,
          bottom: 0,
        }}
      >
        <h3>Thanh toán thành công</h3>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: 18,
          padding: 20,
          backgroundColor: "#d83a3a",
          borderRadius: 15,
          color: "white",
          marginLeft: 16,
          marginRight: 16,
          marginTop: 100,
        }}
        onClick={() => {
          navigate("/home");
        }}
      >
        <h3>Xác nhận</h3>
      </Box>
    </Box>
  );
};

export default ZalopaySuccess;
