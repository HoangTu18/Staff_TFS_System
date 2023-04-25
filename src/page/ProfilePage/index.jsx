import Box from "@mui/material/Box";
import "./index.css";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { useNavigate } from "react-router-dom";
import { ACCOUNT } from "../../utils/constant";
const ProfilePage = () => {
  const navigate = useNavigate();
  const staff = JSON.parse(localStorage.getItem(ACCOUNT));

  const handleLogout = () => {
    localStorage.removeItem(ACCOUNT);
    navigate("/login");
  };
  return (
    <Box
      sx={{
        width: "100%",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <Stack style={styles.avatarContainer} direction="row" spacing={2}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Box
              onClick={() => {
                console.log("check");
              }}
            >
              {/* <PhotoCameraRoundedIcon style={styles.badgeStyle} /> */}
            </Box>
          }
        >
          <Avatar
            style={styles.imageStyle}
            alt="Travis Howard"
            src={staff.staffAvatarUrl}
          />
        </Badge>
      </Stack>
      <Stack
        flexDirection="row"
        style={styles.optionStyle}
        onClick={() => {
          navigate("/profiledetail");
        }}
      >
        <Stack flexDirection="row">
          <AccountCircleRoundedIcon style={styles.icons} />
          <Box sx={{ margin: "auto", marginLeft: "10px" }}>Hồ sơ</Box>
        </Stack>
        <ChevronRightRoundedIcon />
      </Stack>
      <Stack
        flexDirection="row"
        style={styles.optionStyle}
        onClick={() => {
          navigate("/setting");
        }}
      >
        <Stack flexDirection="row">
          <SettingsIcon style={styles.icons} />
          <Box sx={{ margin: "auto", marginLeft: "10px" }}>Cài đặt</Box>
        </Stack>
        <ChevronRightRoundedIcon />
      </Stack>
      <Stack
        flexDirection="row"
        style={styles.optionStyle}
        onClick={() => {
          navigate("/notification");
        }}
      >
        <Stack flexDirection="row">
          <NotificationsActiveRoundedIcon style={styles.icons} />
          <Box sx={{ margin: "auto", marginLeft: "10px" }}>Thông báo</Box>
        </Stack>
        <ChevronRightRoundedIcon />
      </Stack>
      {/* <Stack flexDirection="row" style={styles.optionStyle}>
        <Stack flexDirection="row">
          <InfoRoundedIcon style={styles.icons} />
          <Box sx={{ margin: "auto", marginLeft: "10px" }}>Về ứng dụng</Box>
        </Stack>
        <ChevronRightRoundedIcon />
      </Stack> */}
      <Stack
        flexDirection="row"
        style={styles.optionStyle}
        onClick={() => handleLogout()}
      >
        <Stack flexDirection="row">
          <ExitToAppRoundedIcon style={styles.icons} />
          <Box sx={{ margin: "auto", marginLeft: "10px" }}>Đăng xuất</Box>
        </Stack>
        <ChevronRightRoundedIcon />
      </Stack>
    </Box>
  );
};
const styles = {
  avatarContainer: {
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 50,
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
  },
  icons: {
    color: "#D83A3A",
  },
};
export default ProfilePage;
