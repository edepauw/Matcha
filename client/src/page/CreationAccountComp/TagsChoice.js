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
				{ tags[0] ?
				<Grid item xs={12} sm={6} md={6} className={'Grid'} >
					<Grid item xs={6} sm={4} md={4}>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[0].id, event.target.checked) }} name={tags[0].value} />} label={tags[0].value} />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[1].id, event.target.checked) }} name={tags[1].value} />} label={tags[1].value} />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[2].id, event.target.checked) }} name={tags[2].value} />} label={tags[2].value} />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[3].id, event.target.checked) }} name={tags[3].value} />} label={tags[3].value} />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[4].id, event.target.checked) }} name={tags[4].value} />} label={tags[4].value} />
						</Card>
					</Grid>
					<Grid item xs={6} sm={4} md={4}>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[5].id, event.target.checked) }} name={tags[5].value} />} label={tags[5].value} />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[6].id, event.target.checked) }} name={tags[6].value} />} label={tags[6].value} />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[7].id, event.target.checked) }} name={tags[7].value} />} label={tags[7].value} />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[8].id, event.target.checked) }} name={tags[8].value} />} label={tags[8].value} />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[9].id, event.target.checked) }} name={tags[9].value} />} label={tags[9].value} />
						</Card>
					</Grid>
					<Grid item xs={12} sm={4} md={4}>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[10].id, event.target.checked) }} name={tags[10].value} />} label={tags[10].value} />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[11].id, event.target.checked) }} name={tags[11].value} />} label={tags[11].value} />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[12].id, event.target.checked) }} name={tags[12].value} />} label={tags[12].value} />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[13].id, event.target.checked) }} name={tags[13].value} />} label={tags[13].value} />
						</Card>
						<Card className={'CardTagsCheckBox'}>
							<FormControlLabel control={<Checkbox sx={{ marginLeft: '1em' }} onChange={(event) => { handleCheck(tags[14].id, event.target.checked) }} name={tags[14].value} />} label={tags[14].value} />
						</Card>
					</Grid>
				</Grid>
					:
					<></>
				}
			</Grid>
		</Grid>
	);
}

export default TagChoice;

// WEBPACK FOOTER //
// src/Loginform/LoginForm.js
