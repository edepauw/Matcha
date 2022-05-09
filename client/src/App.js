import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Cookies from 'js-cookie'
import LoginForm from "./components/SignInForm";
import axios from "axios";
import MainPage from "./components/MainPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: window.localStorage.getItem('token')?true:false,
            apiResponse: ""
        }
        console.log(this.state.token);
        if(window.localStorage.getItem('expires') && window.localStorage.getItem('expires') < Date.now())
        {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('expires');
            window.localStorage.removeItem('username');
        }
    }

    render() {
        console.log(this.state.token)
        return (
            <div className="App">
                {this.state.token ?
                    <MainPage token={this.state.token}/>
                    :
                    <LoginForm />
                }
            </div>
        );
    }
}

export default App;



// WEBPACK FOOTER //
// src/App.js
