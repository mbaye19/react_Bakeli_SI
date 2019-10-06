import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import axios from 'axios'
//import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import ProjectList from './components/ProjectList'
import NewProject from './components/NewProject'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import NewUser from './components/users/NewUser'
import ListUser from './components/users/ListUser'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      user: {}
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="container">
            <Route exact path='/' component={ProjectList} />
            <Route path='/create' component={NewProject} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/createUser" component={NewUser} />
            <Route exact path="/listUser" component={ListUser} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
