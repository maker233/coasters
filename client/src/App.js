import React, { Component } from 'react';
import './App.css';

// Components
import CoastersList from "./components/CoastersList"
import CoasterDetails from "./components/CoasterDetails"
import Signup from "./components/SignUp"
import Login from "./components/Login"
import Navbar from "./components/Navbar"


// Routing & DOM
import { Switch, Route } from 'react-router-dom'


// Service
import authService from './service/authService';




class App extends Component {


  constructor(props) {
    super(props)
    this.state = { loggedInUser: null }
    this.service = new authService()
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service.loggedin()
        .then(response => this.setState({ loggedInUser: response }))
        .catch(x => this.setState({ loggedInUser: false }))
    }
  }

  setTheUser = (userObj) => {
    this.setState({ loggedInUser: userObj })
  }


  render() {

    this.fetchUser()

    if (!this.state.loggedInUser) {
      return (
        <div>
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
            <Route exact path='/signup' render={() => <Signup setUser={this.setTheUser} />} />
            <Route exact path='/login' render={() => <Login setUser={this.setTheUser} />} />
            <Route path="/coasters" exact render={() => <CoastersList userInSession={this.state.loggedInUser} />} />
            <Route path="/coasters/:id" exact component={CoasterDetails} />
          </Switch>
        </div>
      )
    } else {
      return (
        <div>
          <Navbar userInSession={this.state.loggedInUser} setUser={this.setTheUser} />
          <Switch>
            <Route path="/coasters" exact render={() => <CoastersList userInSession={this.state.loggedInUser} />} />
            <Route path="/coasters/:id" exact component={CoasterDetails} />
          </Switch>
        </div>
      )
    }
  }
}

export default App;