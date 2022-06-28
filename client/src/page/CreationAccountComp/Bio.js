import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import {
    FormControlLabel,
    Grid,
    TextField,
    Typography,
}
    from '@mui/material';

function Bio(props) {
    return (
        <Grid container columns={12} spacing={3} className={'Bio'}>
            <Grid item xs={12} sm={6} md={6} className={'BioGridTitle'}>
                <Typography variant='h5' id="demo-radio" className={'TitleBio'}>Bio</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className={'BioGridMain'}>
                <TextField
                    required
                    variant="outlined"
                    // id="outlined-required"
                    rows={6}
                    multiline
                    inputProps={{ maxLength: 400 }}
                    placeholder="Votre bio"
                    defaultValue={props.defaultValue}
                    onChange={(event) => {props.onChange(event.target.value)}}
                    />
            </Grid>
        </Grid>
    );
}

export default Bio;
