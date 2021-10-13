import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Styles/index.css';
import { StaticRouter } from "react-router";
const context = {}

ReactDOM.render(
  <StaticRouter context={context}>
        <App />
  </StaticRouter>,
  document.getElementById('root')
);
  


