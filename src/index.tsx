import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { sagaMiddleware } from './app/store';
import rootSaga from './sagas';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// store가 생성된 후 호출해야함. store파일에서 실행하면 import시점이기 때문에 store가 아직 없음.
sagaMiddleware.run(rootSaga);
