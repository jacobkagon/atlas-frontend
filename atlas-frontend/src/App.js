import React, { Component } from 'react';
import HomeContainer from './containers/HomeContainer'
import Navbar from './containers/Navbar' 
import SignIn from './containers/LoginContainer';
import SignUp from './containers/SignUpContainer';
import { Route } from 'react-router-dom';

// import { Route } from 'react-router-dom';

class App extends Component {

  constructor() {
    super()
    this.state = {
      user: []
    }
  }

  handleUser = (userData) => {
    this.setState({
      user: userData
    })
  }

  render() {
    return (
      <div>
         <Route path ="/signup" component={props => <SignUp {...props} handleUser={this.handleUser}/>}/>
         <Route path ="/login" component={props => <SignIn {...props} handleUser={this.handleUser}/>}/>
         <Route path ="/home" component={HomeContainer}/>
        <Navbar/>
        
      </div>
    );
  }
}

export default App;
