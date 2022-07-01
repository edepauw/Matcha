import { Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import "../styles/Home.css";
import {
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
	Slider,
	IconButton,
} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import Chat from "./ChatComponent/Chat";


function Home(props) {
	const [user, setUser] = useState(null);
	const [viewUser, setViewUser] = useState(null);
	const [value, setValue] = useState([18, 28]);
	const [dist, setDist] = useState(500);
	const distRef = useRef(10);

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
			.then((response) => response.json())
			.then(function (data) {
				setUser(data)
			})
		fetch("https://geolocation-db.com/json/").then(res => { return (res.json()) }).then(function (data) {
			console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
			console.log(dist)
			fetch('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/users/search?lat=' + data.latitude + '&long=' + data.longitude + '&dmax=' + dist + '&amin=' + value[0] + '&amax=' + value[1], options)
				.then((response) => response.status === 200 && response.json())
				.then(function (data) {
					console.log(data);
					if (user === null) {
						console.log(data)
						setViewUser(data);
					}
				})
		})
	}, []);


	const handlenext = () => {
		const headers = new Headers();
		headers.append('x-xsrf-token', localStorage.getItem('xsrf'));
		const options = {
			method: 'GET',
			mode: 'cors',
			headers,
			credentials: 'include'
		};
		fetch("https://geolocation-db.com/json/").then(res => { return (res.json()) }).then(function (data) {
			fetch('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/users/search?lat=' + data.latitude + '&long=' + data.longitude + '&dmax=' + dist + '&amin=' + value[0] + '&amax=' + value[1], options)
				.then((response) => response.json())
				.then(function (data) {
					console.log(data);
					if (data.status === 200 && user === null)
						setViewUser(data);
				})
		})
	}

	return (
		<Container maxWidth={false} >
			<Grid container columns={12} spacing={3}>
				<Grid item xs={12} sm={12} md={12} className={'Main'}>
					<Grid item xs={12} sm={3} md={2}>
						<Typography>
							Distance
						</Typography>
						<Slider
							onChange={(e, value) => setDist(value)}
							defaultValue={500} aria-label="Default"
							valueLabelFormat={(value) => <div>{value}Km</div>}
							max={500}
							valueLabelDisplay="auto" />
						<Typography>
							Age
						</Typography>
						<Slider
							onChange={(e, value) => setValue(value)}
							getAriaLabel={() => 'Minimum distance shift'}
							defaultValue={[18, 28]}
							min={18}
							valueLabelDisplay="auto"
							disableSwap
						/>
					</Grid>
					{console.log(viewUser)}
					{ viewUser ? 
						<Grid item xs={12} sm={6} md={8} className={'GridMainCard'}>
							<Card className={'MainCard'}>
								{console.log(viewUser.images[0])}
								<CardMedia
									className={'MainCardMedia'}
									image={'http://' + window.location.href.split('/')[2].split(':')[0] +':667/uploads/' + viewUser.images[0]}
									alt="ken kaneki defonce"
									component="img"
								/>
								<CardContent>
									<Grid className="TitleCard">
										<Typography gutterBottom variant="h5" component="div" className={'TypoCard'}>
											{viewUser.name}
										</Typography>
										<Typography gutterBottom variant="h6" component="div" className={'TypoCardAge'}>
											{viewUser.bd} - 21 km
										</Typography>
									</Grid>
									<Grid item xs={12} sm={12} md={12} className={'BioCard'}>
										{viewUser.bio}
									</Grid>
									<Grid item xs={12} sm={12} md={12} className={'GridTypoMain'}>
										<Typography variant="body2" color="text.secondary" className={'Tags'}>
											#{viewUser.tags[0]}
										</Typography>
										<Typography variant="body2" color="text.secondary" className={'Tags'}>
											#{viewUser.tags[1]}
										</Typography>
										<Typography variant="body2" color="text.secondary" className={'Tags'}>
											#{viewUser.tags[2]}
										</Typography>
										<Typography variant="body2" color="text.secondary" className={'Tags'}>
											...
										</Typography>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					: <></>
					}
					<Grid item xs={12} sm={12} md={12} className={'ActionCardMain'}>
						<IconButton aria-label="trash" color="primary" className={'IconButtonCardTrash'}>
							<CloseIcon fontSize='40' className={'IconCard'} />
						</IconButton>
						<IconButton onClick={handlenext} aria-label="valid" color="primary" className={'IconButtonCardValid'}>
							<FavoriteBorderIcon fontSize='40' className={'IconCard'} />
						</IconButton>
					</Grid>
					<Grid item xs={12} sm={3} md={2}>
						<Chat />
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Home;
