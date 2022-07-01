import React, { Component, useContext } from "react";
import { ThemeContext } from "./context/ThemeContext.tsx";
import "./styles/App.scss";
import LoginForm from "./page/SignInForm";
import MainPage from "./page/MainPage";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreationAccountPage from "./page/CreationAccountPage";
import SignIn from "./page/SignIn";
import { 
    Grid,
    Typography
} from '@mui/material';
import Subscription from "./page/Subscription";
import Home from "./page/Home";
import Chat from "./page/Chat";
import Header from "./page/Header";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: window.localStorage.getItem('token') ? true : false,
            apiResponse: "",
        }
    }

    componentDidMount() {
		const {theme, setTheme} = this.context;
        console.log(this.state.token);
        console.log(localStorage.getItem('expires' + "<" + Date.now()));
        if (localStorage.getItem('expires') && localStorage.getItem('expires') < Date.now()) {
            console.log('token expired')
            localStorage.removeItem('token');
            localStorage.removeItem('expires');
            localStorage.removeItem('username');
        }
    }

	componentDidUpdate() {
		const {theme, setTheme} = this.context;
		if (theme === "dark")
			document.documentElement.style.setProperty("--Back_Color", "#0B0E1D");
		if (theme === "light")
			document.documentElement.style.setProperty("--Back_Color", "#F2F2F2");
	}

    render() {
		const {theme, setTheme} = this.context;
		
        return (
			<div className={theme} id="big_block" >
            <BrowserRouter >
                <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme}_Mode</button>

                <Header />

                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/create/account" element={<CreationAccountPage />} />
                    <Route path="/subscription" element={<Subscription />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </BrowserRouter>
			</div>
        );
    }
}

App.contextType = ThemeContext

export default App;


// WEBPACK FOOTER //
// src/App.js
