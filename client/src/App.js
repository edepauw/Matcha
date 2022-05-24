import React, { Component } from "react";
import "./App.css";
import LoginForm from "./page/SignInForm";
import MainPage from "./page/MainPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: window.localStorage.getItem('token')?true:false,
            apiResponse: ""
        }
    }
    componentDidMount(){
        console.log(this.state.token);
        console.log(localStorage.getItem('expires' + "<" + Date.now()));
        if(localStorage.getItem('expires') &&localStorage.getItem('expires') < Date.now())
        {
            console.log('token expired')
            localStorage.removeItem('token');
            localStorage.removeItem('expires');
            localStorage.removeItem('username');
        }
    }

    render() {
        console.log(this.state.token)
        return (
            <div className="App">
                {this.state.token ?
                    <MainPage token={this.state.token}/>
                    :
                    <LoginForm onChange={(token) => {this.setState({token: token})}}/>
                }
            </div>
        );
    }
}

export default App;



// WEBPACK FOOTER //
// src/App.js
