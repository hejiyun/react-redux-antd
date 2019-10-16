import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../src/components/PrivateRoute'
import Login from './pages/Login'
import Index from './pages/Index'
import './App.css';
import 'antd/dist/antd.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login}></Route>
        <PrivateRoute path='/' component={Index}></PrivateRoute>
      </Switch>
    );
  }
}

export default App;
