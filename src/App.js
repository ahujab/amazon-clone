//import logo from './logo.svg';
import React, { useEffect } from "react";
import './App.css';
import Header from './Header'
import Home from './Home'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Checkout from './Checkout'
import Login from './Login'
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function App() {
  const [{},dispatch]=useStateValue();
  useEffect(()=>{
    //only runs once when app component loads...
    auth.onAuthStateChanged(authUser=>{
      console.log('THE USER IS >>>>', authUser);
      if (authUser){
        //shoot user to data layer
        dispatch({
          type:'SET_USER',
          user:authUser
        })
        //the user just logged in/ the user was logged in
      } else{
        //user is logged out
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })

  },[])
  return (
    //BEM
    <Router>  
    <div className="app">
      
      
      
      <Switch>
      
        <Route path='/checkout'>
        <Header/>
        <Checkout/>
        </Route>
        <Route path='/login'>
        <Login/>
        
        </Route>

        <Route path='/'>
          <Header/>
        <Home/>
        </Route>
       
      </Switch>
     </div>
   
    </Router>
   
  );
}

export default App;
