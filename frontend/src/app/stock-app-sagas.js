import { call, fork, put, takeLatest } from 'redux-saga/effects';

import { getStockCountApi, getStockBestPerformersApi, getStockArchiveDataApi } from './stock-app-resource';
import constants from './stock-app-constants';

export function* getStockCount() {
  try {
    const count = yield call(getStockCountApi);

    yield put({ type: constants.GET_STOCK_COUNT_SUCCESS, payload: count });
  } catch (error) {
    yield put({ type: constants.GET_STOCK_COUNT_ERROR, error });
  }
}

export function* watchGetStockCount() {
  yield takeLatest(constants.GET_STOCK_COUNT_ACTION, getStockCount);
}

export function* getStockBestPerformers() {
  try {
    const list = yield call(getStockBestPerformersApi);

    yield put({ type: constants.GET_STOCK_BEST_PERFORMER_SUCCESS, payload: list });
  } catch (error) {
    yield put({ type: constants.GET_STOCK_BEST_PERFORMER_ERROR, error });
  }
}

export function* watchGetStockBestPerformers() {
  yield takeLatest(constants.GET_STOCK_BEST_PERFORMER_ACTION, getStockBestPerformers);
}

export function* getStockArchiveData(action) {
  try {
    const { field, limit, offset, stockName } = action.payload;

    const data = yield call(getStockArchiveDataApi, field, limit, offset, stockName);

    yield put({ type: constants.GET_ARCHIVE_DATA_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: constants.GET_ARCHIVE_DATA_ERROR, error });
  }
}

export function* watchGetStockArchiveData() {
  yield takeLatest(constants.GET_ARCHIVE_DATA_ACTION, getStockArchiveData);
}

export const watcher = [
  fork(watchGetStockCount),
  fork(watchGetStockBestPerformers),
  fork(watchGetStockArchiveData),
];
