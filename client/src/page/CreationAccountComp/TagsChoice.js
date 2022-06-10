import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import {
	FormControlLabel,
	Grid,
	Checkbox,
	Typography,
	FormGroup,
	Card,
}
	from '@mui/material';

function TagChoice(props) {
	const [tags, setTags] = useState([]);
	const [choosedTags, setChoosedTags] = useState([]);
	useEffect(() => {
		axios.get('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/tags').then(res => {
			setTags(JSON.parse(res.data));
		});
	}, []);

	const handleChangeInteressted = (event) => {
		props.interesstedChange(event.target.name, event.target.checked);
	};

	const handleChangeDate = (event) => {
		props.dateChange(event.target.value);
	};

	const handleChangeGender = (event) => {
		props.genderChange(event.target.value)
	};
	const handleCheck = (id, value) => {
		var cpy = choosedTags;
		if (value) {
			cpy.push(id);
			console.log(cpy);
			props.onChange(JSON.stringify(cpy));
			return;
		}
		var index = cpy.indexOf(id);
		if (index >= 0)
			cpy.splice(index, 1);
		setChoosedTags(cpy);
		console.log(cpy);
		props.onChange(JSON.stringify(cpy));
	}

	return (
		<Grid container columns={12} spacing={3} className={'Tags'}>
			<Grid item xs={12} sm={6} md={6} className={'TagsGridTitle'}>
				<Typography variant='h5' id="demo-radio" className={'TitleTags'}>Tags</Typography>
			</Grid>
			<Grid item xs={12} sm={12} md={12} className={'TagsGridCheckbox'}>
				<Grid item xs={12} sm={6} md={6} className={'Grid'}>
					{/* <FormGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue=""
						name="radio-buttons-group"
						sx={{ textAlign: 'center' }}
					> */}
						{tags.map((tag, index) => {
							return (
								<Grid key={'box' + index}>
									<Card className={'CardTagsCheckBox'}>
										<FormControlLabel control={<Checkbox sx={{marginLeft: '1em'}} onChange={(event) => { handleCheck(tag.id, event.target.checked) }} name={tag.value} />} label={tag.value} />
									</Card>
								</Grid>
							);
						})}
						{/* <Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox name="femme" />} label="Lorem ipsum dolor" />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox checked={homme} onChange={handleChangeInteressted} name="homme" />} label="Lorem ipsum dolor" />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox checked={nonBinaire} onChange={handleChangeInteressted} name="nonBinaire" />} label="Lorem ipsum dolor" />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox checked={nonBinaire} onChange={handleChangeInteressted} name="nonBinaire" />} label="Lorem ipsum dolor" />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox checked={nonBinaire} onChange={handleChangeInteressted} name="nonBinaire" />} label="Lorem ipsum dolor" />
						</Card> */}
					{/* </FormGroup> */}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default TagChoice;

// WEBPACK FOOTER //
// src/Loginform/LoginForm.js
