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
    Typography
}
    from '@mui/material';

function CreationAccountPage() {

    const steps = ['Informations Personnel', 'Photos', 'Tags', 'Bio'];
    const [activeStep, setActiveStep] = useState(0);
    const user = [];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

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
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="femme" control={<Radio />} label="Femme" />
                                    <FormControlLabel value="homme" control={<Radio />} label="Homme" />
                                    <FormControlLabel value="non-binaire" control={<Radio />} label="Non Binaire" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                <Typography variant='h5' id="demo-radio-buttons-group-label" className={'TitleInteressePar'}>Interessé par</Typography>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel control={<Checkbox />} label="Femme" />
                                    <FormControlLabel control={<Checkbox />} label="Homme" />
                                    <FormControlLabel control={<Checkbox />} label="Non Binaire" />
                                </RadioGroup>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={'BirthdayDate'}>
                            <FormLabel id="demo-radio-buttons-group-label" sx={{ marginRight: '1em' }}>Date de Naissance : </FormLabel>
                            <TextField id="outlined-basic" variant="outlined" type="date" />
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
                        <Button onClick={handleNext} className={"ButtonNext"} >
                            {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                        </Button>
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