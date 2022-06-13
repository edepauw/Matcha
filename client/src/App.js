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
            // <BrowserRouter>
            //     <Routes>
            //         <Route path="/CreationAccount" element={<CreationAccountPage token={this.state.token} />}>
            //             {/* : <LoginForm onChange={(token) => {this.setState({token: token})}}/>}> */}
            //             <Route path="CreationAccount" element={<CreationAccountPage />} />
            //         </Route>
            //     </Routes>
            // </BrowserRouter>
			<div className={theme} id="big_block" >
            <BrowserRouter >
            {/* { this.state.token ?  */}
                <Grid container columns={12} spacing={3} >
                    <Grid item xs={12} sm={12} md={12} className={'MainTitle'}>
                        <div className={'fakeLogo'}></div>
                        <Typography variant="h2" className={'TitlePart1'}> Gee</Typography><Typography className={'TitlePart2'} variant="h2"> Coeur</Typography>
                <nav>
                    <ul id="liste">
                        <li><Link to="/">1</Link></li>
                        <li><Link to="/create/account">2</Link></li>
                        <li><Link to="/subscription">3</Link></li>
                        <li><Link to="/signin">4</Link></li>
                        <li><Link to="/home">5</Link></li>
                        <li><Link to="/chat">6</Link></li>
						<button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme}_Mode</button>
                    </ul>
                </nav>
                    </Grid>
                </Grid>
                {/* : <></> */}
            {/* } */}
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
