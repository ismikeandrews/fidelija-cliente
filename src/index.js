import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StaticRouter } from "react-router";
import reportWebVitals from './reportWebVitals';
const context = {}

ReactDOM.render(
  <StaticRouter context={context}>
        <App />
  </StaticRouter>,
  document.getElementById('root')
);
  
reportWebVitals();


