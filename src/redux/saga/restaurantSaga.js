import { hideLoading, showLoading } from "../../component/Loading/LoadingSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import { restaurantService } from "../../services/restaurantService";
import { STATUS_CODE } from "../../utils/constant";
import {
  getRestaurantRequest,
  getRestaurantSuccess,
  getRestaurantFailure,
} from "../../page/HomePage/restaurantSlice";
function* getRestaurantById(action) {
  try {
    yield put(showLoading());
    let res = yield call(() => {
      return restaurantService.getRestaurantById(action.payload);
    });
    if (res.status === STATUS_CODE.SUCCESS) {
      yield put(getRestaurantSuccess(res.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getRestaurantFailure(error));
    yield put(hideLoading());
    // openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetRestaurantById() {
  yield takeLatest(getRestaurantRequest, getRestaurantById);
}
