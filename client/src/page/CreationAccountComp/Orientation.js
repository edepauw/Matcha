import React, { useState } from "react";
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    TextField,
    Grid,
    Checkbox,
    Typography,
    FormGroup,
}
    from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from "react-hook-form";
import AvatarEditor from 'react-avatar-editor';

function Orientation(props) {

    const handleChangeInteressted = (event) => {
		props.interesstedChange(event.target.name, event.target.checked);
    };

    const handleChangeDate = (event) => {
		props.dateChange(event.target.value);
    };

    const handleChangeGender = (event) => {
		props.genderChange(event.target.value)
    };




    return (
			<Grid container columns={12} spacing={2} className={'GenreInteresse'}>
				<Grid className={'GenreInteresse'}>
					<Grid item xs={6} sm={6} md={6} sx={{ marginRight: '15em' }}>
						<Typography variant='h5' id="demo-radio-buttons-group-label" className={'TitleGenre'}>Genre</Typography>
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							value={props.gender?? ''}
							name="radio-buttons-group"
							// value={valueGender}
							onChange={handleChangeGender}
						>
							<FormControlLabel value="femme" control={<Radio />} label="Femme" />
							<FormControlLabel value="homme" control={<Radio />} label="Homme" />
							<FormControlLabel value="non-binaire" control={<Radio />} label="Non Binaire" />
						</RadioGroup>
					</Grid>
					<Grid item xs={6} sm={6} md={6}>
						<Typography variant='h5' id="demo-radio-buttons-group-label" className={'TitleInteressePar'}>Interessé par</Typography>
						<FormGroup
							aria-labelledby="demo-radio-buttons-group-label"
							defaultValue=""
							name="radio-buttons-group"
						>
							<FormControlLabel control={<Checkbox defaultChecked={props.f} onChange={handleChangeInteressted} name="femme" />} label="Femme" />
							<FormControlLabel control={<Checkbox defaultChecked={props.h} onChange={handleChangeInteressted} name="homme" />} label="Homme" />
							<FormControlLabel control={<Checkbox defaultChecked={props.n} onChange={handleChangeInteressted} name="nonBinaire" />} label="Non Binaire" />
						</FormGroup>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={12} md={12} className={'BirthdayDate'}>
					<FormLabel id="demo-radio-buttons-group-label" sx={{ marginRight: '1em' }}>Date de Naissance : </FormLabel>
					<TextField
						id="outlined-basic"
						variant="outlined"
						defaultValue={props.date?? ''}
						type="date"
						onChange={handleChangeDate}
					/>
				</Grid>
			</Grid>
    );
}

export default Orientation;

// WEBPACK FOOTER //
// src/Loginform/LoginForm.js
