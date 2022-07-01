import "../styles/Header.css";
import { Container, minWidth } from "@mui/system";
import React, { useEffect, useState } from "react";
import "../styles/Chat.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
	Button,
	CardActions,
	IconButton,
	Menu,
	MenuItem,
} from "@mui/material";


function Header() {

	const [me, setMe] = useState();
	const [complete, setComplete] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		getMe();
	}, []);

	const getMe = () => {
		const headers = new Headers();
		headers.append('x-xsrf-token', localStorage.getItem('xsrf'));
		const options = {
			method: 'GET',
			mode: 'cors',
			headers,
			credentials: 'include'
		};
		fetch('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/users/me', options)
			.then((response) => response.json())
			.then(function (data) {
				// `data` is the parsed version of the JSON returned from the above endpoint.
				setMe(data)
			})
	}

	const test = () => {
		console.log('test');
	}

	return (
		<Grid container columns={12} spacing={3} sx={{ display: 'inline-flex' }} >
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

					</ul>
				</nav>
				{me && me.bio ?
				<Grid item xs={12} sm={12} md={12} className={'MainProfil'}>
						{/* <Typography gutterBottom variant="h5" component="div" className={'TypoCardChat'}>
							Eliott
						</Typography> */}
						<Button
							className={'ButtonProfil'}
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							<CardMedia
								className={'ProfilePicture'}
								component="img"
								image={'http://' + window.location.href.split('/')[2].split(':')[0] +':667/uploads/' + me.image}
								alt="ken kaneki defonce"
							/>
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
						>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handleClose}>Logout</MenuItem>
						</Menu>
					</Grid>
					: <></>
				}
			</Grid>

		</Grid>
	);
}

export default Header;



// WEBPACK FOOTER //
// src/Loginform/LoginForm.js
