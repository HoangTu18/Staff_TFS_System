import { Box } from "@mui/material";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import successIcon from "./79952-successful.json";
const Success = () => {
  const navigate = useNavigate();
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
        Đã đổi mật khẩu thành công
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: 18,
          marginTop: 100,
          padding: 20,
          backgroundColor: "#d83a3a",
          borderRadius: 15,
          color: "white"
        }}
        onClick={() => {
          navigate("/profile");
        }}
      >
        Xác nhận
      </Box>
    </Box>
  );
};

export default Success;
