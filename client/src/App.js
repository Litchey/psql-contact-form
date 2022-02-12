import React,{Fragment, useState, useEffect} from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

//components

import Dashboard from "./components/Dashboard";
import Login from  "./components/Login";
import Register from "./components/Register";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
  setIsAuthenticated(boolean);
  }

  async function isAuth() {                                      
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method : "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      
    } catch (error) {
     console.error(error.message);
    }
  };
  useEffect(() => {
    isAuth();
  });

  return (
    <Fragment>
      <Router>
        <div className = "container">

          <Switch>
          <Route exact path="/" render={props =>
              isAuthenticated ? <Dashboard {...props} setAuth = {setAuth} /> : (<Redirect to = "/register"/>) } 
              />
            

            <Route exact path="/login" render={props => 
               !isAuthenticated ? (<Login {...props} setAuth = {setAuth} /> ) : ( <Redirect to = "/dashboard"/>)  }
               />


            <Route exact path="/register" render={props => 
            !isAuthenticated ? (<Register {...props} setAuth = {setAuth} />) : (<Redirect to = "/register"/>) }
            />


            
            <Route exact path="/dashboard" render={props =>
              isAuthenticated ? <Dashboard {...props} setAuth = {setAuth} /> : (<Redirect to = "/login"/>) } 
              />

          </Switch>

         
          {/* <Route path="/login" render={routeProps => ( <Profile routeProps={routeProps} />)} />  //used in router dom version -5*/}
        </div>
        
      </Router>
    </Fragment>
  );
}

export default App;
