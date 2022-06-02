import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import {
    FormControlLabel,
    Grid,
    Checkbox,
}
    from '@mui/material';

function TagChoice(props) {
	const [tags, setTags] = useState([]);
	const [choosedTags, setChoosedTags] = useState([]);
	useEffect(() => {
		axios.get('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/tags').then(res => {
			setTags(JSON.parse(res.data));
		});
	},[]);

    const handleChangeInteressted = (event) => {
		props.interesstedChange(event.target.name, event.target.checked);
    };

    const handleChangeDate = (event) => {
		props.dateChange(event.target.value);
    };

    const handleChangeGender = (event) => {
		props.genderChange(event.target.value)
    };
	const handleCheck = (id, value) =>{
		var cpy = choosedTags;
		if(value){
			cpy.push(id);
			console.log(cpy);
			props.onChange(JSON.stringify(cpy));
		return;
		}
		var index = cpy.indexOf(id);
		if(index >= 0)
			cpy.splice(index, 1);
		setChoosedTags(cpy);
		console.log(cpy);
		props.onChange(JSON.stringify(cpy));
	}




    return (
			<Grid container className={'checkBoxesContainer'}>
				{tags.map((tag, index) => {
						return (
							<Grid className={'checkBoxTags'} key={'box' + index}>
								<FormControlLabel control={<Checkbox onChange={(event) => {handleCheck(tag.id, event.target.checked)}} name={tag.value} />} label={tag.value} />
							</Grid>
						);
					})
				}
			</Grid>
    );
}

export default TagChoice;

// WEBPACK FOOTER //
// src/Loginform/LoginForm.js
