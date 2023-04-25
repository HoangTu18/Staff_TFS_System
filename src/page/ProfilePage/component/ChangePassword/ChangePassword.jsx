import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";
import { toast } from "react-toastify";
import { ACCOUNT, API_URL } from "../../../../utils/constant";
import axios from "axios";
const ChangePassword = () => {
  const navigate = useNavigate();

  const account = JSON.parse(localStorage.getItem(ACCOUNT));
  // console.log('1',account);
  const oldPasswordRef = useRef("");
  const newPasswordRef = useRef("");
  const reNewPasswordRef = useRef("");

  const handleSubmit = async () => {
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const reNewPassword = reNewPasswordRef.current.value;
    if (account !== undefined) {
      if (account.theAccountForStaff.password === oldPassword) {
        if (newPassword !== "") {
          if (newPassword === reNewPassword) {
            const data = {
              staffId: account.staffId,
              staffFullName: account.staffFullName,
              staffEmail: account.staffEmail,
              staffAvatarUrl: account.staffAvatarUrl,
              staffActivityStatus: account.staffActivityStatus,
              staffStatus: account.staffStatus,
              theAccountForStaff: {
                accountId: account.theAccountForStaff.accountId,
                phoneNumber: account.theAccountForStaff.phoneNumber,
                password: newPassword,
                roleId: account.theAccountForStaff.roleId,
                status: account.theAccountForStaff.status,
              },
            };
            console.log('data',data);
            try {
              const response = await axios.put(API_URL + "/staffs", data);
              console.log(response);
              if (response.status === 200) {
                toast.success("Cập nhật mật khẩu thành công", {
                  position: "top-center",
                });
                console.log(
                  "update password success, this log for option if toast not show"
                );
              }
            } catch (error) {
              toast.error("Cập nhật mật khẩu thất bại", {
                position: "top-center",
              });
              console.log(
                "update password fail, this log for option if toast not show"
              );
            }
          } else {
            toast.error("Mật khẩu nhập lại không khớp", {
              position: "top-center",
            });
            console.log(
              "old-password not match, this log for option if toast not show"
            );
          }
        } else {
          toast.error("Vui lòng nhập mật khẩu mới", {
            position: "top-center",
          });
          console.log(
            "new-password empty, this log for option if toast not show"
          );
        }
      } else {
        toast.error("Mật khẩu cũ không đúng", { position: "top-center" });
        console.log(
          "old password not match, this log for option if toast not show"
        );
      }
    } else {
      console.log("local storage undefined");
    }
    navigate("/success");
  };

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
              navigate("/setting");
            }}
          >
            <img src="/images/back-icon.svg" alt="" />
            <h2>Đổi mật khẩu</h2>
          </div>
        </div>

        <Stack flexDirection="row" style={styles.optionStyle}>
          <Stack flexDirection="row">
            <Box sx={{ margin: "auto", marginLeft: "10px" }}>
              <input
                className="textInput"
                placeholder="Mật khẩu cũ"
                ref={oldPasswordRef}
                type="password"
                id="oldPassword"
                name="oldPassword"
                required
              />
            </Box>
          </Stack>
          <LockIcon style={styles.icons} />
        </Stack>

        <Stack flexDirection="row" style={styles.optionStyle}>
          <Stack flexDirection="row">
            <Box sx={{ margin: "auto", marginLeft: "10px" }}>
              <input
                className="textInput"
                placeholder="Mật khẩu mới"
                ref={newPasswordRef}
                type="password"
                id="newPassword"
                name="newPassword"
                required
              />
            </Box>
          </Stack>
          <LockIcon style={styles.icons} />
        </Stack>

        <Stack flexDirection="row" style={styles.optionStyle}>
          <Stack flexDirection="row">
            <Box sx={{ margin: "auto", marginLeft: "10px" }}>
              <input
                className="textInput"
                placeholder="Nhập lại mật khẩu mới"
                ref={reNewPasswordRef}
                type="password"
                id="reNewPassword"
                name="reNewPassword"
                required
              />
            </Box>
          </Stack>
          <LockIcon style={styles.icons} />
        </Stack>
        <Box sx={{ margin: "auto", marginLeft: "20%" }} onClick={handleSubmit}>
          <Button
            style={{
              backgroundColor: "#D83A3A",
              width: "14rem",
              borderRadius: "20px",
            }}
            variant="contained"
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

export default ChangePassword;
