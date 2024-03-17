import { call, put, takeEvery } from 'redux-saga/effects';
import {
  DogAction,
  getDogUrlFulfilled,
  getDogUrlPending,
  getDogUrlRejected,
} from '../features/toDo/dogSlice';

interface ResponseType {
  id: string;
  url: string;
  width: number;
  height: number;
}

const apiKey = process.env.REACT_APP_API_KEY;
export const getDogUrl = async () => {
  if (typeof apiKey !== 'string') throw new Error('apiKey is empty');
  const respones = await (
    await fetch(`https://api.thecatapi.com/v1/images/search`, {
      method: 'GET',
      headers: { 'x-api-key': apiKey },
      credentials: 'omit',
    })
  ).json();
  return respones;
};

// action파라미터로 action을 가로챌 수 있음.
function* getDogUrlSaga() {
  try {
    const dogImage: ResponseType[] = yield call(getDogUrl);
    yield put(getDogUrlFulfilled({ data: dogImage[0].url }));
  } catch (error) {
    yield put(getDogUrlRejected({ data: error as string }));
  }
}

export default function* watchGetDogUrlSaga() {
  yield takeEvery(getDogUrlPending.type, getDogUrlSaga);
}
