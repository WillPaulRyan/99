import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Main from './components/Main'
import Login from './components/Login'
import './App.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/play">
          <Main />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

