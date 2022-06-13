import { Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import "../styles/Home.css";
import {
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
	Button,
	CardActions,
	IconButton,
} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';


function Home(props) {
	useEffect(() => {
			const headers = new Headers();
			headers.append('x-xsrf-token', localStorage.getItem('xsrf'));
			const options = {
			method: 'GET',
			mode: 'cors',
			headers,
			credentials: 'include'
			};
			fetch('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/users/me', options)
				.then(function(response) {
					console.log(response.body);
				})
    },[]);
	return (
		<Container maxWidth={false} >
			<Grid container columns={12} spacing={3} className={'Main'}>
				<Grid item xs={12} sm={12} md={12} className={'GridMainCard'}>
					<Card className={'MainCard'}>
						<CardMedia
							className={'MainCardMedia'}
							component="img"
							image={require('../test-home.jpg')}
							alt="ken kaneki defonce"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div" className={'TypoCard'}>
								Eliott Depauw le boss du game
							</Typography>
							<Grid item xs={12} sm={12} md={12} className={'GridTypoMain'}>
								<Grid item xs={12} sm={12} md={12} className={'GridTypoSecond'}>
									<Typography variant="body2" color="text.secondary">
										#jesuistombeyy
									</Typography>
									<Typography variant="body2" color="text.secondary">
										#jesuisbo
									</Typography>
								</Grid>
								<Grid item xs={12} sm={12} md={12} className={'GridTypoSecond'}>
									<Typography variant="body2" color="text.secondary">
										#pasreveille
									</Typography>
									<Typography variant="body2" color="text.secondary">
										#jaimelesboulasse
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
						<CardActions className={'ActionCardMain'}>
							<IconButton aria-label="trash" color="primary" className={'IconButtonCardTrash'}>
								<CloseIcon fontSize='40' className={'IconCard'} />
							</IconButton>
							<IconButton aria-label="valid" color="primary" className={'IconButtonCardValid'}>
								<FavoriteBorderIcon fontSize='40' className={'IconCard'} />
							</IconButton>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Home;
