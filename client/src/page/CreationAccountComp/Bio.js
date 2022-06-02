import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import {
    FormControlLabel,
    Grid,
    Checkbox,
}
    from '@mui/material';

function Bio(props) {
    return (
			<Grid container className={'bioContainer'}>
				<input type="text" placeholder="Votre bio" defaultValue={props.defaultValue} onChange={(event) => {props.onChange(event.target.value)}}/>
			</Grid>
    );
}

export default Bio;

// WEBPACK FOOTER //
// src/Loginform/LoginForm.js
