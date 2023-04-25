import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { QRCode } from "antd";
import { API_URL } from "../../utils/constant";
import { formatToVND } from "../../utils/numberUtil";
const ZaloPaymentPage = () => {
  const { state } = useLocation();
  const { order, paymentResponse, zaloResponse,zaloPayOrder } = state;
  const [paymentStatus, setPaymentStatus] = useState(zaloResponse);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      checkPayment();
    }, 400);
    return () => clearInterval(interval);
  }, []);
  const checkPayment = () => {
    let url = API_URL + "/orders/checkPayment/" + paymentResponse.apptransid;
    axios.get(url).then((res) => {
      setPaymentStatus(res.data);
    });
  };


  useEffect(() => {
    if (paymentStatus.returnCode === 1) {
        navigate("/paymentsuccess", {state:{
            order:order 
        }})
    }
  }, [paymentStatus.returnCode]);


  return (
    <div>
          
      <Box
        style={{
          flex: 1,
          display: "flex",
          flexDirection:"column",
        }}
      >
        
        <QRCode
          value={paymentResponse.zaloUrl}
          size={250}
          style={{ margin: "auto", marginTop: 200 }}
        />
        <h1 style={{margin:"auto", marginTop: 20}}>{formatToVND(zaloPayOrder.totalPrice)} Đ</h1>
      </Box>
    </div>
  );
};

export default ZaloPaymentPage;
