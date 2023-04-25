import { hideLoading, showLoading } from "../../component/Loading/LoadingSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import { categoryService } from "../../services/caterogyService";
import { STATUS_CODE } from "../../utils/constant";
import {
  getCategorySuccess,
  getCategoryRequest,
  getCategoryFailure,
} from "../../page/MenuPage/categorySlice";
function* getCategory(action) {
  try {
    yield put(showLoading());
    let listCategory = yield call(() => {
      return categoryService.getCategory();
    });
    if (listCategory.status === STATUS_CODE.SUCCESS) {
      yield put(getCategorySuccess(listCategory.data));
    }
    yield put(hideLoading());
  } catch (error) {
    yield put(getCategoryFailure(error));
    yield put(hideLoading());
    // openNotification("error", "Thất bại", "Thao tác của bạn đã thất bại");
  }
}

export function* followActiongetCategory() {
  yield takeLatest(getCategoryRequest, getCategory);
}
