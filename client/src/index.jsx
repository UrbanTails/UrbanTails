import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <Router>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Router>, 
  document.getElementById('app')
);