import { call, put, takeEvery } from 'redux-saga/effects';
import {
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
// 제네레이터에 넘겨줘야하는 건 객체로 파싱된 Promise객체이다.
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
// 미들웨어에 Promise객체가 들어가면 미들웨어는 Promise가 완료될 때까지 saga를 일시 중지함. (call yield까지 진행)
// Promise가 resolve되면 saga가 재작동함. (다음 yield 실행)
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
