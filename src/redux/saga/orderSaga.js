import { hideLoading, showLoading } from "../../component/Loading/LoadingSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import { orderService } from "../../services/orderService";
import { ACCOUNT, ORDER, STATUS_CODE } from "../../utils/constant";
import {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailure,
  getCustomerRequest,
  getCustomerSuccess,
  getCustomerFailure,
  getListCustomerRequest,
  getListCustomerSuccess,
  getListCustomerFailure,
  updateOrderRequest,
  updateOrderFail,
  insertOrderRequest,
} from "../../page/OrderPage/orderSlice";
function* getOrderByStaffId(action) {
  try {
    yield put(showLoading());
    let listOrder = yield call(() => {
      return orderService.getOrderByStaffId(action.payload);
    });
    if (listOrder.status === STATUS_CODE.SUCCESS) {
      yield put(getOrderSuccess(listOrder.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getOrderFailure(error));
    yield put(hideLoading());
    // openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetOrders() {
  yield takeLatest(getOrderRequest, getOrderByStaffId);
}

function* getCustomerById(action) {
  try {
    yield put(showLoading());
    let customer = yield call(() => {
      return orderService.getCustomerById(action.payload);
    });
    if (customer.status === STATUS_CODE.SUCCESS) {
      yield put(getCustomerSuccess(customer.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getCustomerFailure(error));
    yield put(hideLoading());
    // openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetCustomer() {
  yield takeLatest(getCustomerRequest, getCustomerById);
}

function* updateOrderStatus(action) {
  try {
    yield put(showLoading());
    let order = yield call(() => {
      console.log(action.payload);
      return orderService.updateOrderStatus(action.payload);
    });
    if (order.status === STATUS_CODE.SUCCESS) {
      const staffData1 = JSON.parse(localStorage.getItem(ACCOUNT));
      yield put(getOrderRequest(staffData1.staffId));
      yield put(getListCustomerRequest());
      localStorage.setItem(ORDER, JSON.stringify(order.data));
      yield put(hideLoading());
    }
  } catch (error) {
    yield put(getOrderFailure(error));
    yield put(hideLoading());
    // openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActionUpdateOrderStatus() {
  yield takeLatest(updateOrderRequest, updateOrderStatus);
}

function* getCustomers() {
  try {
    yield put(showLoading());
    let listCustomers = yield call(() => {
      return orderService.getCustomers();
    });
    if (listCustomers.status === STATUS_CODE.SUCCESS) {
      yield put(getListCustomerSuccess(listCustomers.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getListCustomerFailure(error));
    yield put(hideLoading());
    // openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetCustomers() {
  yield takeLatest(getListCustomerRequest, getCustomers);
}

function* insertOrderStatus(action) {
  try {
    yield put(showLoading());
    let order = yield call(() => {
      return orderService.insertOrder(action.payload);
    });
    if (order.status === STATUS_CODE.SUCCESS) {
      const staffData1 = JSON.parse(localStorage.getItem(ACCOUNT));
      yield put(getOrderRequest(staffData1.staffId));
      yield put(getListCustomerRequest());
      localStorage.setItem(ORDER, JSON.stringify(order.data));
      yield put(hideLoading());
    }
  } catch (error) {
    yield put(getOrderFailure(error));
    yield put(hideLoading());
  }
}

export function* followActionInsertOrderStatus() {
  yield takeLatest(insertOrderRequest, insertOrderStatus);
}
