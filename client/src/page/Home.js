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
	const [dist, setDist] = useState(50);
	const distRef = useRef(10);
	const aRangeRef = useRef(null);

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
					console.log(response);
						if(response.status === 200 && user === null)
							setUser(response);
						else{
							window.location = 'http://' + window.location.href.split('/')[2].split(':')[0] + ':3000';
							console.log("error");
						}
				})
				fetch("https://geolocation-db.com/json/").then(res => {return (res.json()) }).then(function(data) {
				// `data` is the parsed version of the JSON returned from the above endpoint.
				console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
				fetch('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/users/search?lat=' + data.latitude + '&long=' + data.longitude + '&dmax=' +  dist + '&amin=' +value[0] + '&amax=' + value[1], options)
				.then(function(response) {
					console.log(response);
					// if(response.status === 200 && user === null)
					// 	setUser(response);
					// else{
						// 	window.location = 'http://' + window.location.href.split('/')[2].split(':')[0] + ':3000';
						// 	console.log("error");
						// }
					})
				});
				},[]);
	const handlenext = () =>{
		const headers = new Headers();
		headers.append('x-xsrf-token', localStorage.getItem('xsrf'));
		const options = {
		method: 'GET',
		mode: 'cors',
		headers,
		credentials: 'include'
		};
		fetch("https://geolocation-db.com/json/").then(res => {return (res.json()) }).then(function(data) {
			// `data` is the parsed version of the JSON returned from the above endpoint.
			console.log(aRangeRef.current);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
			fetch('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/users/search?lat=' + data.latitude + '&long=' + data.longitude + '&dmax=' +  dist + '&amin=' +value[0] + '&amax=' + value[1], options)
			.then(function(response) {
				console.log(response);
				// if(response.status === 200 && user === null)
				// 	setUser(response);
				// else{
					// 	window.location = 'http://' + window.location.href.split('/')[2].split(':')[0] + ':3000';
					// 	console.log("error");
					// }
				})
			});
	}
	return (
		<Container maxWidth={false} >
		{user &&
			<Grid container columns={12} spacing={3}>
				<Grid item xs={12} sm={12} md={12} className={'Main'}>
					<Grid item xs={12} sm={3} md={2}>
						<Typography>
							Distance
						</Typography>
						<Slider
						onChange={(e, value) => setDist(value)}
						 defaultValue={50} aria-label="Default"
						valueLabelFormat={(value) => <div>{value}Km</div>}
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
					{viewUser &&
					<Grid item xs={12} sm={6} md={8} className={'GridMainCard'}>
						<Card className={'MainCard'}>
							<CardMedia
								className={'MainCardMedia'}
								image={require('../edep.jpg')}
								alt="ken kaneki defonce"
								component="img"
							/>
								<CardContent>
								<Grid className="TitleCard">
									<Typography gutterBottom variant="h5" component="div" className={'TypoCard'}>
										Eliott Depauw
									</Typography>
									<Typography gutterBottom variant="h6" component="div" className={'TypoCardAge'}>
										21 ans - 21 km
									</Typography>
								</Grid>
								<Grid item xs={12} sm={12} md={12} className={'BioCard'}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sagittis urna quis est ornare, eu sollicitudin felis posuere. Proin vehicula nisl at ex ullamcorper, in elementum neque ullamcorper. Proin vehicula nisl at ex ullamcorper ...
								</Grid>
								<Grid item xs={12} sm={12} md={12} className={'GridTypoMain'}>
									<Typography variant="body2" color="text.secondary" className={'Tags'}>
										#jesuistombeyy
									</Typography>
									<Typography variant="body2" color="text.secondary" className={'Tags'}>
										#jesuisbo
									</Typography>
									<Typography variant="body2" color="text.secondary" className={'Tags'}>
										#pasreveille
									</Typography>
									<Typography variant="body2" color="text.secondary" className={'Tags'}>
										...
									</Typography>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
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
			}
		</Container>
	);
}

export default Home;
