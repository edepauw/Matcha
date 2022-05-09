import React, { useRef, useState } from "react";
import axios from 'axios';
import SideMenu from './sideMenu';
import "./MainPage.css";

function MainPage () {
	const [menuSelect, setMenuSelect] = useState('home');
	const handleConnect = () => {
		if(SignUp)
		{
			axios.post('http://127.0.0.1:667/auth/signup', {
				email: EMailRef.current.value,
				password: PassRef.current.value,
				repassword: AgainRef.current.value,
				username: PseudoRef.current.value
			},{withCredentials: true})
		}
		else
			axios.post('http://127.0.0.1:667/auth/login', {
				email: EMailRef.current.value,
				password: PassWd
			})
	}
	return (
		<div className={"MainPageGrid"}>
			<div className="menu">
				<SideMenu/>
			</div>
			<div class="header"></div>
			<div class="main"></div>
		</div>
	);
}

export default MainPage
;



// WEBPACK FOOTER //
// src/Loginform/LoginForm.js
