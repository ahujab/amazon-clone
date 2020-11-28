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
import Payment from "./Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from "./Orders";
const promise=loadStripe("pk_test_51Hrq7ZBTzQtvtPPEM80Qfc90XUNUyuLZJhraWWLBFuqFb3tKE4YtUqsgvo9vJHeteeLRzfSu1BZ2FGBZUSKbAUTt00AVT1d5dI");

function App() {
  const [{},dispatch]=useStateValue();
  useEffect(()=>{
    //only runs once when app component loads...
    auth.onAuthStateChanged(authUser=>{
      console.log('hello:  THE USER IS >>>>', authUser);
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
        <Route path='/orders'>
          <Header/>
        <Orders/>
        
        </Route>
        <Route path='/checkout'>
        <Header/>
        <Checkout/>
        </Route>
        <Route path='/login'>
        <Login/>
        
        </Route>
        <Route path='/payment'>
          <Header/>
          <Elements stripe={promise}>
            <Payment/>
          </Elements>
          
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
