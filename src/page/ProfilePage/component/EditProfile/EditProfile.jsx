import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCOUNT } from "../../../../utils/constant";
import "./EditProfile.css";
const EditProfile = () => {
  const navigate = useNavigate();
  const staff = JSON.parse(localStorage.getItem(ACCOUNT));
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
              navigate("/profiledetail");
            }}
          >
            <img src="/images/back-icon.svg" alt="" />
            <h2>Cập nhật thông tin cá nhân</h2>
          </div>
        </div>

        <Stack style={styles.avatarContainer} direction="row" spacing={2}>
          <span style={{ fontWeight: "bold" }}>{staff.staffFullName}</span>
        </Stack>

        <Box style={{ marginBottom: "10px", fontSize: "18px" }}>
          <span style={{ fontWeight: "bold" }}>Họ và tên</span>
        </Box>
        <Stack flexDirection="row" style={styles.optionStyle}>
          <input
            value={staff?.staffFullName}
            style={styles.input}
          />
        </Stack>

        <Box style={{ marginBottom: "10px", fontSize: "18px" }}>
          <span style={{ fontWeight: "bold" }}>Email</span>
        </Box>
        <Stack flexDirection="row" style={styles.optionStyle}>
          <input value={staff?.staffEmail} style={styles.input} />
        </Stack>

        <Box style={{ marginBottom: "10px", fontSize: "18px" }}>
          <span style={{ fontWeight: "bold" }}>Số điện thoại</span>
        </Box>
        <Stack flexDirection="row" style={styles.optionStyle}>
          <input
            value={staff?.theAccountForStaff?.phoneNumber}
            style={styles.input}
          />
        </Stack>

        {/* <Box style={{ marginBottom: "10px", fontSize: "18px" }}>
          <span style={{ fontWeight: "bold" }}>Ngày Sinh</span>
        </Box>
        <Stack flexDirection="row" style={styles.optionStyle}>
          <input value="01/08/2000" style={styles.input} />
        </Stack> */}
        <Box sx={{ margin: "auto", marginLeft: "20%" }}>
          <Button
            style={{
              backgroundColor: "#D83A3A",
              width: "14rem",
              borderRadius: "20px",
            }}
            variant="contained"
            onClick={() => {
              navigate("/success");
            }}
          >
            Xác nhận
          </Button>
        </Box>
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
    paddingBottom: "50px",
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
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  icons: {
    color: "#D83A3A",
  },
  input: {
    border: "none",
    fontSize: "16px",
    width: "100%",
    backgroundColor: "transparent",
    margin: "auto",
    marginLeft: "10px",
  },
};

export default EditProfile;
