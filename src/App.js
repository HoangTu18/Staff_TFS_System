import "./App.css";
import { SafeArea } from "antd-mobile";
import { Route, Routes } from "react-router-dom";
import AppNavigation from "./AppNavigation";
import HomePage from "./page/HomePage";
import OrderPage from "./page/OrderPage";
import MenuPage from "./page/MenuPage";
import ProfilePage from "./page/ProfilePage/index";
import Profile from "./page/ProfilePage/component/Profile/Profile";
import EditProfile from "./page/ProfilePage/component/EditProfile/EditProfile";
import Setting from "./page/ProfilePage/component/ChangePassword/Setting";
import ChangePassword from "./page/ProfilePage/component/ChangePassword/ChangePassword";
import { BrowserRouter as Router } from "react-router-dom";
import ZaloPaymentPage from "./page/ZaloPaymentPage";
import Success from "./page/ProfilePage/component/ChangePassword/success/Success";
import OrderDetail from "./page/OrderDetailPage";
import CreateOrder from "./page/OrderPage/CreateOrder";
import Loading from "./component/Loading/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./page/LoginPage";
import { ACCOUNT } from "./utils/constant";
import { useEffect, useState } from "react";
import ZalopaySuccess from "./page/ZaloPaymentPage/ZalopaySuccess";
import Notification from "./page/ProfilePage/component/Notification";
// import Password from "./page/ProfilePage/component/ChangePassword/Password";

function App() {
  // const [staff, setStaff] = useState({});
  // useEffect(() => {
  //   setStaff(JSON.parse(localStorage.getItem(ACCOUNT)));
  // }, [JSON.parse(localStorage.getItem(ACCOUNT))]);
  return (
    <div>
      <Router>
        <Loading />
        <ToastContainer />
        <Routes>
          <Route path="" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="" element={<HomePage />} />
          <Route path="order">
            <Route path=":id" element={<OrderDetail />} />
            <Route path="" element={<OrderPage />} />
          </Route>
          <Route path="order" element={<OrderPage />} />
          <Route path="createorder" element={<CreateOrder />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profiledetail" element={<Profile />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="setting" element={<Setting />} />
          <Route path="notification" element={<Notification />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="success" element={<Success />} />
          <Route path="zalopayment" element={<ZaloPaymentPage />} />
          <Route path="paymentsuccess" element={<ZalopaySuccess />} />
        </Routes>
        {/* {staff !== null &&} */}
        <AppNavigation />
      </Router>
    </div>
  );
}

export default App;
