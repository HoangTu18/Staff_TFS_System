import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Setting.css";

const Setting = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <div className="order-page">
        <div className="order-title">
          <div
            className="order-title-detail"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <img src="/images/back-icon.svg" alt="" />
            <h2>Hồ sơ</h2>
          </div>
        </div>

        <Stack
          flexDirection="row"
          style={styles.optionStyle}
          onClick={() => {
            navigate("/changepassword");
          }}
        >
          <Stack flexDirection="row">
            <LockIcon style={styles.icons} />
            <Box sx={{ margin: "auto", marginLeft: "10px" }}>Đổi mật khẩu</Box>
          </Stack>
          <ChevronRightRoundedIcon style={styles.icons} />
        </Stack>
      </div>
    </Box>
  );
};
const styles = {
  avatarContainer: {
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 50,
    fontSize: 26,
  },
  imageStyle: {
    display: "block",
    width: 90,
    height: 90,
  },
  badgeStyle: {
    border: "2px solid transparent",
    backgroundColor: "#f0f0f0",
    borderRadius: "100px",
    padding: "2px",
    height: 30,
    width: 30,
    color: "gray",
  },
  optionStyle: {
    justifyContent: "space-between",
    backgroundColor: "#eeeeee",
    padding: 16,
    borderRadius: 15,
    fontSize: "16px",
    marginBottom: "30px",
  },
  icons: {
    color: "#D83A3A",
  },
};

export default Setting;
