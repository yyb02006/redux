import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import fetchDogImage from './fetchDogImage';

// 사가 중앙관리
export default function* rootSaga() {
  yield all([fork(fetchDogImage)]);
}
