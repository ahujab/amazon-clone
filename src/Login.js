import React from 'react'
import './Login.css'
import {Link, useHistory} from "react-router-dom";
import { useState } from 'react';
import {auth} from './firebase';

function Login() {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const history=useHistory();
    const signIn=e=>{
        e.preventDefault()
        //firebase login
        auth.signInWithEmailAndPassword(email,password)
        .then(auth=>{
            history.push('/')
            console.log(auth);
        })
        .catch(error=>alert(error.message))

    }
    const register=e=>{
        e.preventDefault()
        //firebase register
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
            //successfully creates new user and gives back auth token
            console.log(auth);
            if (auth){
                history.push('/')
            }
        })
        .catch(error=>alert(error.message))
    }

    //Prevent reload of page by using preventdefault
    return (
        <div className="login">
            <Link to='/'>
            <img className="login__logo"
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'/>
            </Link>
        <div className="login__container">
            <h1>Sign-in</h1>
            <form>
            <h5>E-mail</h5>
            <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
            {/* everytime you type email it will set taht email target value */}
            <h5>Password</h5>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
            
            <button type='submit' onClick={signIn} className="login__signInButton">Sign In</button>

            </form>
            <p>By signing-in you agree to Amazon's Conditions of Use & Sale. Please see our Privacy notice, our Cookies Notice and our Interest-Based Ads Notice </p>
            <button onClick={register} className="login__registerbutton">
                Create your Amazon Account
            </button>


        </div>

        </div>
    )
}

export default Login
