import ReactDOM from 'react-dom'
import React from 'react'
import "./styles/index.scss"
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store/store.config'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

