import { call, fork, put, takeLatest } from 'redux-saga/effects';

import { getSwiftCountApi, getSwiftArchiveDataApi } from './swift-app-resource';
import constants from './swift-app-constants';

export function* getSwiftCount() {
  try {
    const stats = yield call(getSwiftCountApi);

    yield put({ type: constants.GET_SWIFT_COUNT_SUCCESS, payload: stats });
  } catch (error) {
    yield put({ type: constants.GET_SWIFT_COUNT_ERROR, error });
  }
}

export function* watchGetSwiftCount() {
  yield takeLatest(constants.GET_SWIFT_COUNT_ACTION, getSwiftCount);
}

export function* getSwiftArchiveData(action) {
  try {
    const { field, limit, offset, category } = action.payload;

    const data = yield call(getSwiftArchiveDataApi, field, limit, offset, category);

    yield put({ type: constants.GET_ARCHIVE_DATA_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: constants.GET_ARCHIVE_DATA_ERROR, error });
  }
}

export function* watchGetSwiftArchiveData() {
  yield takeLatest(constants.GET_ARCHIVE_DATA_ACTION, getSwiftArchiveData);
}

export const watcher = [
  fork(watchGetSwiftCount),
  fork(watchGetSwiftArchiveData),
];
