import React, { useRef, useContext, useState } from "react";
import axios from 'axios';

import "../styles/Subscription.scss";
import { ThemeContext } from "../context/ThemeContext.tsx";
import styles from "../styles/SignIn.scss"
import BackAnimation from "./BackAnimation";
import {
	TextField,
	Button,
	Grid,
	Container,
	Typography,
	FormControl,
	Snackbar,
}
	from '@mui/material';

import { Controller, useForm } from 'react-hook-form';

function Subscription() {
	
	const { control: controlSubscription, handleSubmit: handleSubmitSubscription } = useForm();
    const [transition, setTransition] = useState(undefined);
    const [open, setOpen] = useState(false);

	const handleClose = () => {
        setOpen(false);
    };

	const onSubmitSubscription = async (dataSubscription) => {
        if (dataSubscription.password != dataSubscription.confirmed_password) {
            setOpen(true);
        }
        console.log(dataSubscription);
		axios.post('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/auth/signup', dataSubscription ,{withCredentials: true}).then(res => {
				const {xsrfToken} = res.data;
				localStorage.setItem('xsrfToken', JSON.stringify(xsrfToken));
			})
    }

	const { theme } = useContext(ThemeContext)
	console.log(theme)

	return (

		<div className={`${styles[theme]}`}>
			<BackAnimation/>
		<Container maxWidth={false}>
			<Grid container columns={12} spacing={3} >
				<Grid item xs={12} sm={12} md={12} className={'Title'}>
					<Typography variant="h1" className={'TitlePart1'}> Gee</Typography><Typography className={'TitlePart2'} variant="h1"> Coeur</Typography>
				</Grid>
			</Grid>
			<form onSubmit={handleSubmitSubscription(onSubmitSubscription)}>
				<Grid item xs={12} sm={12} md={12} className={'TitleSubscription'} >
					<Typography variant="h6" className={'TitleSubscriptionTypo'}>Inscription</Typography>
				</Grid>
				<Grid item xs={12} sm={12} md={12} className={'InputForm'} >
					<Controller
						name={"email"}
						control={controlSubscription}
						render={({ field: { onChange, value } }) => (
							<TextField
								className={'TextFieldSubscription'}
								id="email-subscription"
								label="Email"
								value={value == null ? '' : value}
								onChange={onChange}
								type="email"
								required
							/>
						)} />
					<Controller
						name={"lastname"}
						control={controlSubscription}
						render={({ field: { onChange, value } }) => (
							<TextField
								className={'TextFieldSubscription'}
								id="lastname-subscription"
								label="Nom"
								value={value == null ? '' : value}
								onChange={onChange}
								required
							/>
						)} />
					<Controller
						name={"firstname"}
						control={controlSubscription}
						render={({ field: { onChange, value } }) => (
							<TextField
								className={'TextFieldSubscription'}
								id="firstname-subscription"
								label="Prénom"
								value={value == null ? '' : value}
								onChange={onChange}
								required
							/>
						)} />
					<Controller
						name={"username"}
						control={controlSubscription}
						render={({ field: { onChange, value } }) => (
							<TextField
								className={'TextFieldSubscription'}
								id="username-subscription"
								label="Pseudo"
								value={value == null ? '' : value}
								onChange={onChange}
								required
							/>
						)} />
					<Controller
						name={"password"}
						control={controlSubscription}
						render={({ field: { onChange, value } }) => (
							<TextField
								className={'TextFieldSubscription'}
								id="password-subscription"
								label="Mot de passe"
								value={value == null ? '' : value}
								onChange={onChange}
								type="password"
								required
							/>
						)} />
					<Controller
						name={"confirmed_password"}
						control={controlSubscription}
						render={({ field: { onChange, value } }) => (
							<TextField
								className={'TextFieldSubscription'}
								id="confirmed_password-subscription"
								label="Confirmation de mot de passe"
								value={value == null ? '' : value}
								onChange={onChange}
								type="password"
								required
							/>
						)} />
				</Grid>
				<Grid item xs={12} ms={12} md={12} className={'DivButtonSubscription'}>
					<Button className={"ButtonSusciption"} type="submit">
						Creer mon compte
					</Button>
				</Grid>
			</form>

			<Snackbar
				open={open}
				onClose={handleClose}
				TransitionComponent={transition}
				message="Vos mots de passe ne correspondent pas !"
				key={transition ? transition.name : ''}
			/>

		</Container>
		</div>

	);
}

export default Subscription;