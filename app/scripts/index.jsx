// Polyfills
import 'core-js/shim';
import 'isomorphic-fetch';
import 'classlist-polyfill';
import 'vendor/polyfills';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, persistor } from 'app-store';

import App from 'containers/App';
import Loader from 'components/Loader';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue, white } from 'material-ui/colors';

import '../styles/main.scss';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: blue,
    accent: white,
    type: 'light',
  },
});

/* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

function renderRoot(Component) {
  const root = document.getElementById('react');

  /* istanbul ignore next */
  if (root) {
    ReactDOM.render(
      <MuiThemeProvider theme={theme}>
        <AppContainer>
          <Provider store={store}>
            <PersistGate
              loading={<Loader />}
              persistor={persistor}
            >
              <Component />
            </PersistGate>
          </Provider>
        </AppContainer>
      </MuiThemeProvider>,
      root
    );
  }
}

renderRoot(App);

/* istanbul ignore next  */
if (module.hot) {
  module.hot.accept(
    'containers/App',
    () => renderRoot(App)
  );
}
