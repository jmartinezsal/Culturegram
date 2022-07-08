import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { IconContext } from 'react-icons/lib';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <ModalProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ModalProvider>
    </IconContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
