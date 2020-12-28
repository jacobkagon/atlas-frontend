import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './containers/LoginContainer'
import SignUp from './containers/SignUpContainer'

ReactDOM.render(
  <Router>
  <div>
    <Route exact path="/" component={App} />
    <Route exact path = "/login" component={Login}/>
    <Route exact path = "/signup" component={SignUp}/>
    </div>
    </Router>,
  document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
