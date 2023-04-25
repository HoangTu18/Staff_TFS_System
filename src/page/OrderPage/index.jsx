import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getListCustomerRequest, getOrderRequest } from "./orderSlice";
import { ACCOUNT, ORDER } from "../../utils/constant";
import { formatToVND } from "../../utils/numberUtil";
const OrderPage = () => {
  const navigate = useNavigate();
  const goToOrderDetailPage = (data) => {
    localStorage.setItem(ORDER, JSON.stringify(data));
    navigate(`/order/${data.id}`);
  };
  const staffData1 = JSON.parse(localStorage.getItem(ACCOUNT));
  const dispatch = useDispatch();
  const listOrder = useSelector((state) => state.orderManage.listOrder);
  const listCustomer = useSelector((state) => state.orderManage.listCustomer);
  const [filterlistOrder, setFilterListOrder] = useState([]);
  useEffect(() => {
    dispatch(getOrderRequest(staffData1.staffId));
    dispatch(getListCustomerRequest());
  }, [dispatch]);

  const getNameByCusId = (id) => {
    let data = listCustomer.find((item) => item.customerId === +id);
    if (data !== undefined) {
      return data.customerName ?? "";
    }
    return "";
  };
  useEffect(() => {
    if (filterlistOrder.length === 0) {
      handleOnChange(1);
    }
  }, []);

  const explainStatus = (status) => {
    switch (status) {
      case "pending":
        return "Chờ nhận đơn";
      case "accept":
        return "Chờ xác nhận";
      case "delivery":
        return "Đang giao hàng";
      case "done":
        return "Đã nhận hàng";
      case "deny":
        return "Huỷ đơn";
      default:
        break;
    }
  };

  const handleOnChange = (e) => {
    let eId = e !== 1 ? +e.target.value : 1;
    setFilterListOrder([]);
    switch (eId) {
      case 1:
        listOrder.forEach((item) => {
          setFilterListOrder((prev) => [...prev, item]);
        });
        break;
      case 2:
        listOrder.forEach((item) => {
          if (item.status === "pending") {
            setFilterListOrder((prev) => [...prev, item]);
          }
        });
        break;
      case 3:
        listOrder.forEach((item) => {
          if (item.status === "accept") {
            setFilterListOrder((prev) => [...prev, item]);
          }
        });
        break;
      case 4:
        listOrder.forEach((item) => {
          if (item.status === "delivery") {
            setFilterListOrder((prev) => [...prev, item]);
          }
        });
        break;
      case 5:
        listOrder.forEach((item) => {
          if (item.status === "done") {
            setFilterListOrder((prev) => [...prev, item]);
          }
        });
        break;
      case 6:
        listOrder.forEach((item) => {
          if (item.status === "deny") {
            setFilterListOrder((prev) => [...prev, item]);
          }
        });
        break;
      default:
        listOrder.forEach((item) => {
          setFilterListOrder((prev) => [...prev, item]);
        });
        break;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <div className="order-page">
        <div className="order-title">
          <div className="order-title-detail" style={{ width: "100%" }}>
            <div style={{ display: "flex", width: "100%" }}>
              <h2> Đơn đặt hàng</h2>
            </div>
            {/* <div style={{ fontSize: "21px" }}>
              <FontAwesomeIcon
                icon={faPlus}
                onClick={() => {
                  navigate("/createorder");
                }}
              />
            </div> */}
          </div>
        </div>
        <h2 className="order-sum">Tổng đơn hàng: {filterlistOrder.length}</h2>
        <select className="filter" onChange={handleOnChange}>
          <option value="1">Tất cả</option>
          {/* <option value="2">Chờ nhận đơn</option> */}
          <option value="3">Chờ xác nhận</option>
          <option value="4">Đang giao hàng</option>
          <option value="5">Đã nhận hàng</option>
          {/* <option value="6">Huỷ đơn</option> */}
        </select>
        <div className="order-list">
          {filterlistOrder.length === 0 ? (
            <h2>Hiện không có đơn hàng</h2>
          ) : (
            filterlistOrder.reverse().map((item, index) => (
              <div
                key={index}
                className="order-item"
                onClick={() => {
                  goToOrderDetailPage(item);
                }}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="left">
                  <h3 className="orderID">#{item.id}</h3>
                  <h3 className="order-customer">{item.customerName}</h3>
                  <div className="order-products">
                    {item.totalQuantity} sản phẩm
                  </div>
                </div>
                <div className="right">
                  <h3 className="price">{formatToVND(item.totalPrice)}đ</h3>
                  <div className="confirmnative">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <span>{explainStatus(item.status)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Box>
  );
};

export default OrderPage;
