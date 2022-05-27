import React, { useRef, useState } from "react";
import "../styles/CreationAccountPage.css";
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    TextField,
    Button,
    Box,
    Step,
    Stepper,
    StepLabel,
    Grid,
    Container,
    Checkbox,
    Typography,
    FormGroup
}
    from '@mui/material';

function CreationAccountPage() {

    const steps = ['Informations Personnel', 'Photos', 'Tags', 'Bio'];
    const [activeStep, setActiveStep] = useState(0);
    const [valueGender, setValueGender] = useState('');
    const [valueDate, setValueDate] = useState('');
    var user = {
        gender: null,
        birthday_date: null,
        interessted: [],
    };
    const [state, setState] = useState({
        femme: false,
        homme: false,
        nonBinaire: false,
    });
    const {femme, homme, nonBinaire} = state;
    const error = [femme, homme, nonBinaire].filter((v) => v).length >= 1;

    const handleChangeInteressted = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const handleChangeDate = (event) => {
        setValueDate(event.target.value);
    };

    const handleChangeGender = (event) => {
        setValueGender(event.target.value);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const updateProfil = () => {
        console.log(valueGender);
        if (activeStep === 0) {
            user.gender = valueGender;
            user.birthday_date = valueDate;
            user.interessted[0] = state.femme;
            user.interessted[1] = state.homme;
            user.interessted[2] = state.nonBinaire;
            if (valueGender === 'femme') {
                user.gender = 0;
            }
            if (valueGender === 'homme') {
                user.gender = 1;
            }
            if (valueGender === 'nonBinaire') {
                user.gender = 2;
            }
        }
        console.log(user);
    }

    return (
        <Container maxWidth={false}>
            <Grid container columns={12} spacing={3} >
                {activeStep === 0 ?
                    <Grid container columns={12} spacing={2} className={'GenreInteresse'}>
                        <Grid className={'GenreInteresse'}>
                            <Grid item xs={6} sm={6} md={6} sx={{ marginRight: '15em' }}>
                                <Typography variant='h5' id="demo-radio-buttons-group-label" className={'TitleGenre'}>Genre</Typography>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue=""
                                    name="radio-buttons-group"
                                    value={valueGender}
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
                                    <FormControlLabel control={<Checkbox checked={femme} onChange={handleChangeInteressted} name="femme" />} label="Femme" />
                                    <FormControlLabel control={<Checkbox checked={homme} onChange={handleChangeInteressted} name="homme" />} label="Homme" />
                                    <FormControlLabel control={<Checkbox checked={nonBinaire} onChange={handleChangeInteressted} name="nonBinaire" />} label="Non Binaire" />
                                </FormGroup>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={'BirthdayDate'}>
                            <FormLabel id="demo-radio-buttons-group-label" sx={{ marginRight: '1em' }}>Date de Naissance : </FormLabel>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                type="date"
                                value={valueDate}
                                onChange={handleChangeDate}
                            />
                        </Grid>
                    </Grid>
                    : activeStep === 1 ?

                        <Grid container columns={12} spacing={2} className={'Photo'}>
                            <Grid item xs={12} sm={12} md={12} className={'Photo'}>
                            </Grid>
                        </Grid>

                        : <></>
                }
                <Grid className={'ButtonDiv'}>
                    {activeStep == 0 ?
                        <></>
                        :
                        <Grid item xs={12} sm={12} md={12} className={'ButtonBackDiv'}>
                            <Button
                                className={"ButtonBack"}
                                variant="contained"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Retour
                            </Button>
                        </Grid>
                    }
                    <Grid item xs={12} sm={12} md={12} className={'ButtonNextDiv'}>
                        { valueGender != '' &&  valueDate != '' && error ?
                            <Button onClick={() => { handleNext(), updateProfil() }} className={"ButtonNextEnable"} >
                                {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                            </Button>
                        : 
                            <Button disabled onClick={() => { handleNext(), updateProfil() }} className={"ButtonNextDisable"} >
                                {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                            </Button>
                        }
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <Box className={'Stepper'}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </Box>
                </Grid>

            </Grid>
        </Container>

    );
}

export default CreationAccountPage;

// WEBPACK FOOTER //
// src/Loginform/LoginForm.js