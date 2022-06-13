import { Container, minWidth } from "@mui/system";
import React, { useRef, useState } from "react";
import "../styles/Chat.css";
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


function Chat(props) {
	return (
		<Container maxWidth={false} >
			<Grid container columns={12} spacing={3} className={'MainChat'}>
				<Card className={'CardChatMain'}>
					<Grid item xs={12} sm={12} md={12} className={'BlockChat'}>
						<Grid item xs={3} sm={3} md={3}>
							<CardMedia
								className={'MainChatCardMedia'}
								component="img"
								image={require('../edep.jpg')}
								alt="ken kaneki defonce"
							/>
						</Grid>
						<Grid item xs={9} sm={9} md={9} className={'BodyChat'}>
							<Grid >
								<Typography gutterBottom variant="h5" component="div" className={'TypoCardChat'}>
									Eliott
								</Typography>
							</Grid>
							<Grid >
								<Typography gutterBottom variant="body" component="div" className={'TypoCardChatBody'}>
									Lorem Ipsum mes couilles Lorem Ipsum mes couilles...
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Card>
				<Card className={'CardChatMain'}>
					<Grid item xs={12} sm={12} md={12} className={'BlockChat'}>
						<Grid item xs={3} sm={3} md={3} sx={{minWidth: '60px'}}>
							<CardMedia
								className={'MainChatCardMedia'}
								component="img"
								image={require('../edep.jpg')}
								alt="ken kaneki defonce"
							/>
						</Grid>
						<Grid item xs={9} sm={9} md={9} className={'BodyChat'}>
							<Grid >
								<Typography gutterBottom variant="h5" component="div" className={'TypoCardChat'}>
									Eliott
								</Typography>
							</Grid>
							<Grid >
								<Typography gutterBottom variant="body" component="div" className={'TypoCardChatBody'}>
									Lorem Ipsum mes couilles Lorem Ipsum mes couilles...
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Card>
				<Card className={'CardChatMain'}>
					<Grid item xs={12} sm={12} md={12} className={'BlockChat'}>
						<Grid item xs={3} sm={3} md={3}>
							<CardMedia
								className={'MainChatCardMedia'}
								component="img"
								image={require('../edep.jpg')}
								alt="ken kaneki defonce"
							/>
						</Grid>
						<Grid item xs={9} sm={9} md={9} className={'BodyChat'}>
							<Grid >
								<Typography gutterBottom variant="h5" component="div" className={'TypoCardChat'}>
									Eliott
								</Typography>
							</Grid>
							<Grid >
								<Typography gutterBottom variant="body" component="div" className={'TypoCardChatBody'}>
									Lorem Ipsum mes couilles Lorem Ipsum mes couilles...
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Card>
				<Card className={'CardChatMain'}>
					<Grid item xs={12} sm={12} md={12} className={'BlockChat'}>
						<Grid item xs={3} sm={3} md={3}>
							<CardMedia
								className={'MainChatCardMedia'}
								component="img"
								image={require('../edep.jpg')}
								alt="ken kaneki defonce"
							/>
						</Grid>
						<Grid item xs={9} sm={9} md={9} className={'BodyChat'}>
							<Grid >
								<Typography gutterBottom variant="h5" component="div" className={'TypoCardChat'}>
									Eliott
								</Typography>
							</Grid>
							<Grid >
								<Typography gutterBottom variant="body" component="div" className={'TypoCardChatBody'}>
									Lorem Ipsum mes couilles Lorem Ipsum mes couilles...
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Card>
			</Grid>
		</Container>
	)
}

export default Chat;