import React, { useRef, useState } from "react";
import Cookies from 'js-cookie'
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';
import "./SignInForm.css";
import avatar from './avatarUnknow.png';

function SignInForm () {
	const EMailRef = useRef(null);
	const PassRef = useRef(null);
	const AgainRef = useRef(null);
	const PseudoRef = useRef(null);
	const [SignUp, setSignUp] = useState(false);
	const prechange = Cookies.get('pseudo') ? false : true;
	const [changing, setChanging] = useState(prechange);
	const changeStyle = () => {
		AgainRef.current.className = !SignUp ? "LoginFormAgain" : "LoginFormHide";
		PseudoRef.current.className = !SignUp ? "LoginFormPseudo" : "LoginFormHide";
		EMailRef.current.placeholder = !SignUp ? "Email" : "Email/Username";
		setSignUp(!SignUp);
	}
	const test = () => {
		axios.get('http://localhost:667/users/test')
	}

	const handleConnect =  () => {
		if(SignUp)
		{
			if(!(EMailRef.current.value??Cookies.get('pseudo')) || !PassRef.current.value || !AgainRef.current.value || !PseudoRef.current.value)
			{
				console.log('toastify')//toastify
				return
			}
			axios.post('http://127.0.0.1:667/auth/signup', {
				email: EMailRef.current.value,
				password: PassRef.current.value,
				repassword: AgainRef.current.value,
				username: PseudoRef.current.value
			},{withCredentials: true}).then(res => {
				if(res.data.token)
				{
					window.localStorage.setItem('token', res.data.token);
					window.localStorage.setItem('expires', res.data.expires);
					window.localStorage.setItem('username', res.data.username);
				}}).catch(err => {
					console.log(err)
				})
		}
		else
		{
			if(!(EMailRef.current.value??Cookies.get('pseudo')) || !PassRef.current.value)
			{
				console.log('toastify')//toastify
				return
			}
			axios.post('http://127.0.0.1:667/auth/login', {
				email: EMailRef.current.value??Cookies.get('pseudo'),
				password: PassRef.current.value
			})
		}
	}
	console.log(changing + Cookies.get('pseudo'))
	return (
		<div className={"LoginForm"}>
				<img src={Cookies.get('avatar') && !changing ?Cookies.get('avatar') : avatar} width="60%" style={{marginRight:'auto', marginLeft:'auto'}}/>
				<input ref={PseudoRef} onKeyDown={e => e.key === 'Enter' && handleConnect()} className={"LoginFormHide"} placeholder="Username"/>
				{ Cookies.get('pseudo') && !changing ? <h1 onClick={() => setChanging(true)}>{Cookies.get('pseudo')}</h1>
				:<input ref={EMailRef} onKeyDown={e => e.key === 'Enter' && handleConnect()} className="LoginFormInputEMail" placeholder="Pseudo or Email"/>}
				<input ref={PassRef} onKeyDown={e => {console.log(e.key); e.key === 'Enter' && handleConnect()}} type='password' className="LoginFormInputPassword" placeholder="password"/>
				<input ref={AgainRef} onKeyDown={e => e.key === 'Enter' && handleConnect()} type='password' className={"LoginFormHide"} placeholder="Confirm password"/>
				<button onClick={changeStyle} className="LoginFormSignUp">{SignUp?'SignIn':'SignUp'}</button>
				<div onClick={test} className="LoginFormForget">Forget password?</div>
		</div>
	);
}

export default SignInForm
;



// WEBPACK FOOTER //
// src/Loginform/LoginForm.js
