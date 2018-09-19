import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { Spin } from 'antd';

const Loader = () =>
  <div className="loading-screen">
    <Spin />
  </div>

const Root = () =>
  <StripeProvider apiKey='pk_test_uOGZjFbtEH0nSxSVNqHmWaEq'>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <HashRouter>
          <App />
        </HashRouter>
      </PersistGate>
    </Provider>
  </StripeProvider>

render(<Root />,document.getElementById('root'));

registerServiceWorker();
