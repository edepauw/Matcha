import React, { useRef, useState } from "react";
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';
import "./SignInForm.css";

function SignInForm () {
	const EMailRef = useRef(null);
	const PassRef = useRef(null);
	const AgainRef = useRef(null);
	const PseudoRef = useRef(null);
	const [SignUp, setSignUp] = useState(false)
	const changeStyle = () => {
		AgainRef.current.className = !SignUp ? "LoginFormAgain" : "LoginFormHide";
		PseudoRef.current.className = !SignUp ? "LoginFormPseudo" : "LoginFormHide";
		EMailRef.current.placeholder = !SignUp ? "Email" : "Email/Username";
		setSignUp(!SignUp);
	}
	const test = () => {
		axios.get('http://localhost:667/users/test')
	}

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
		<div className={"LoginForm"}>
				<input ref={PseudoRef} className={"LoginFormHide"} placeholder="Username"/>
				<input ref={EMailRef} className="LoginFormInputEMail" placeholder="Pseudo or Email"/>
				<input ref={PassRef} type='password' className="LoginFormInputPassword" placeholder="password"/>
				<input ref={AgainRef} type='password' className={"LoginFormHide"} placeholder="Confirm password"/>
				<button onClick={handleConnect} className="LoginFormSignIn">OK</button>
				<button onClick={changeStyle} className="LoginFormSignUp">{SignUp?'SignIn':'SignUp'}</button>
				<div onClick={test} className="LoginFormForget">Forget password?</div>
		</div>
	);
}

export default SignInForm
;



// WEBPACK FOOTER //
// src/Loginform/LoginForm.js
