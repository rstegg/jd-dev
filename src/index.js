import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { Spin } from 'antd';

const Loader = () =>
  <div className="loading-screen">
    <Spin />
  </div>

ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </HashRouter>,
    document.getElementById('root')
);

registerServiceWorker();
