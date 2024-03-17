import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import fetchDogImage from './fetchDogImage';

export default function* rootSaga() {
  yield all([fetchDogImage]);
}
