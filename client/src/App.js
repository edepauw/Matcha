import React, { Component } from "react";
import "./styles/App.css";
import LoginForm from "./page/SignInForm";
import MainPage from "./page/MainPage";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreationAccountPage from "./page/CreationAccountPage";
import SignIn from "./page/SignIn";
import { 
    Grid,
    Typography
} from '@mui/material';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: window.localStorage.getItem('token') ? true : false,
            apiResponse: ""
        }
    }

    componentDidMount() {
        console.log(this.state.token);
        console.log(localStorage.getItem('expires' + "<" + Date.now()));
        if (localStorage.getItem('expires') && localStorage.getItem('expires') < Date.now()) {
            console.log('token expired')
            localStorage.removeItem('token');
            localStorage.removeItem('expires');
            localStorage.removeItem('username');
        }
    }

    render() {
        console.log(this.state.token)
        return (
            // <BrowserRouter>
            //     <Routes>
            //         <Route path="/CreationAccount" element={<CreationAccountPage token={this.state.token} />}>
            //             {/* : <LoginForm onChange={(token) => {this.setState({token: token})}}/>}> */}
            //             <Route path="CreationAccount" element={<CreationAccountPage />} />
            //         </Route>
            //     </Routes>
            // </BrowserRouter>

            <BrowserRouter>
                {/* <Grid container columns={12} spacing={3} >
                    <Grid item xs={12} sm={12} md={12} className={'Title'}>
                        <div className={'fakeLogo'}></div>
                        <Typography variant="h2" className={'TitlePart1'}> Gee</Typography><Typography className={'TitlePart2'} variant="h2"> Coeur</Typography>
                    </Grid>
                </Grid> */}
                <nav>
                    <ul>
                        <li><Link to="/">1</Link></li>
                        <li><Link to="/create/account">2</Link></li>
                        {/* <li><Link to="/login">3</Link></li> */}
                        <li><Link to="/signin">4</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/create/account" element={<CreationAccountPage />} />
                    {/* <Route path="/login" element={<LoginForm />} /> */}
                    <Route path="/signin" element={<SignIn />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;


// WEBPACK FOOTER //
// src/App.js
