import React, { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Home2, Note, Book, ProfileCircle, ShoppingCart } from "iconsax-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ACCOUNT, API_URL } from "./utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useCallback } from "react";
import ReactHowler from "react-howler";
import NotificationSound from "./assets/notification2.mp3";
export default function AppNavigation() {
  const [value, setValue] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(1);
  const [list, setList] = useState([]);
  const [prev, setPrev] = useState(0);
  const [isNoti, setIsNoti] = useState(false);
  const {pathname} = location
  const staffData1 = JSON.parse(localStorage.getItem(ACCOUNT));
  useEffect(()=>{
    if(localStorage.getItem(ACCOUNT)){
      setCount(1)
      setPrev(0)
    }else{
      setPrev(0)
      setList([])
    }
  },[localStorage.getItem(ACCOUNT)])
  useEffect(() => {
    // setCur(list.length);
    // console.log("prev", prev);
    // console.log("curent", list.length);
    if (prev !== list.length) {
      if (prev !== 0 || list.length === 1) {
      if(localStorage.getItem(ACCOUNT)){
        toast.success("Bạn có đơn hàng mới", { position: "top-center" });
        setIsNoti(true);
      }
      }
    }

    const interval = setInterval(() => {
      fetchData();
      setCount((prevCount) => prevCount + 1);
      setPrev(list.length);
      // console.log(list.length);
    }, 1000);

    if (staffData1 === null) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [count]);

  const fetchData = () => {
    axios
      .get(
        `${API_URL}/notifications/byaccount/` +
          staffData1.theAccountForStaff.accountId
      )
      .then((res) => {
       if(pathname !=="/profile"){
        setList(res.data);
       }
      })
      .catch((err) => {
        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (pathname === "/menu") {
      setValue("menu");
    } else if (pathname === "/" || pathname === "/login"){
      setPrev(0)
      setList([])
    }
  }, [pathname]);
  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        display:
          pathname === "/login" ||
          pathname === "/zalopayment" ||
          // pathname === "/createorder" ||
          pathname === "/paymentsuccess" ||
          pathname === "/"
            ? "none"
            : "flex",
      }}
      value={value}
      onChange={handleChange}
    >
      <ReactHowler
        src={NotificationSound}
        onEnd={() => {
          setIsNoti(false);
        }}
        
        playing={isNoti}
      />
      <BottomNavigationAction
        label={<p style={{ fontSize: "12px " }}>Trang chủ</p>}
        value="home"
        onClick={() => {
          navigate("/home");
        }}
        icon={<Home2 />}
      />
      <BottomNavigationAction
        label={<p style={{ fontSize: "12px " }}>Đơn hàng</p>}
        value="orders"
        onClick={() => {
          navigate("/order");
        }}
        icon={<Note />}
      />
      <BottomNavigationAction
        label={<p style={{ fontSize: "12px " }}>Giỏ Hàng</p>}
        value="createorder"
        onClick={() => {
          navigate("/createorder");
        }}
        icon={<ShoppingCart />}
      />
      <BottomNavigationAction
        label={<p style={{ fontSize: "12px " }}>Thực đơn</p>}
        value="menu"
        onClick={() => {
          navigate("/menu");
        }}
        icon={<Book />}
      />
      <BottomNavigationAction
        label={<p style={{ fontSize: "12px " }}>Cá nhân</p>}
        value="profile"
        onClick={() => {
          navigate("/profile");
        }}
        icon={<ProfileCircle />}
      />
    </BottomNavigation>
  );
}
