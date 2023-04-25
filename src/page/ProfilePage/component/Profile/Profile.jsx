import CakeIcon from "@mui/icons-material/Cake";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ACCOUNT } from "../../../../utils/constant";
const Profile = () => {
  const navigate = useNavigate();
  const staff = JSON.parse(localStorage.getItem(ACCOUNT));
  console.log(staff);
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
        <Stack style={styles.avatarContainer} direction="row" spacing={2}>
          {staff?.staffFullName}
        </Stack>
        <Stack
          flexDirection="row"
          style={styles.optionStyle}
          // onClick={() => {
          //   navigate("/editprofile");
          // }}
        >
          <Stack flexDirection="row">
            <PhoneAndroidIcon style={styles.icons} />
            <Box sx={{ margin: "auto", marginLeft: "10px" }}>
              {staff?.theAccountForStaff?.phoneNumber}
            </Box>
          </Stack>
          {/* <EditIcon /> */}
        </Stack>
        <Stack
          flexDirection="row"
          style={styles.optionStyle}
          // onClick={() => {
          //   navigate("/editprofile");
          // }}
        >
          <Stack flexDirection="row">
            <MailIcon style={styles.icons} />
            <Box sx={{ margin: "auto", marginLeft: "10px" }}>
              {staff?.staffEmail}
            </Box>
          </Stack>
          {/* <EditIcon /> */}
        </Stack>
        {/* <Stack
          flexDirection="row"
          style={styles.optionStyle}
          onClick={() => {
            navigate("/editprofile");
          }}
        >
          <Stack flexDirection="row">
            <CakeIcon style={styles.icons} />
            <Box sx={{ margin: "auto", marginLeft: "10px" }}>01/08/2000</Box>
          </Stack>
          <EditIcon />
        </Stack> */}
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

export default Profile;
