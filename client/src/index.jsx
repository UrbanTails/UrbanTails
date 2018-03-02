import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import App from './components/app.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <BrowserRouter history={ browserHistory }>
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
  </BrowserRouter>, document.getElementById('app'));