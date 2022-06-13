import React, { useEffect, useState } from "react";
import "../styles/CreationAccountPage.css";
import { v4 as uuidv4 } from 'uuid';
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
    FormGroup,
    Input,
    Slider,
    Modal
}
    from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from "react-hook-form";
import AvatarEditor from 'react-avatar-editor';
import Orientation from "./CreationAccountComp/Orientation";
import ImageChoose from "./CreationAccountComp/ImageChoose";
import TagChoice from "./CreationAccountComp/TagsChoice";
import Bio from "./CreationAccountComp/Bio";
import axios from "axios";

function CreationAccountPage() {

    const { handleSubmit } = useForm();
    const steps = ['Informations Personnel', 'Photos', 'Tags', 'Bio'];
    const [activeStep, setActiveStep] = useState(0);
    const [canNext, setCanNext] = useState(false);
    const [valueGender, setValueGender] = useState('');
    const [valueDate, setValueDate] = useState('');
    const [bio, setBio] = useState('');
    const [images, setImages] = useState('[]'); //JSON string
    const [tagsjson, setTagsjson] = useState('[]'); //JSON string
    const [files, setFiles] = useState([]);
    const [addFiles, setAddFiles] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [me, setMe] = useState();

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
    const { femme, homme, nonBinaire } = state;
    const error = [femme, homme, nonBinaire].filter((v) => v).length >= 1;

    const handleChangeInteressted = (name, checked) => {
        var cpy = state;
        cpy[name] = checked;
        setState(cpy);
    };


    useEffect(() => {
        localStorage.setItem('xsrf', window.location.search.split('=')[1])
    },[]);

    useEffect(() => {
        checkCanNext();
        console.log('salut');
    },[activeStep, valueDate, valueGender, state, images, tagsjson, bio]);

    const checkCanNext = () => {
        if(activeStep === 0) {
            if(valueGender != '' && valueDate != '' && error) {
                setCanNext(true);
            }
            else if(canNext) {
                setCanNext(false);
            }
        }
        if(activeStep === 1) {
            var cpy = JSON.parse(images);
            var a = 0;
            console.log(a);
            if(cpy[0] != null && (cpy[1] != null || cpy[2] != null || cpy[3] != null || cpy[4] != null || cpy[5] != null)) {
                setCanNext(true);
            }
            else if(canNext) {
                setCanNext(false);
            }
        }
        if(activeStep === 2) {
            var cpy = JSON.parse(tagsjson);
            var a = 0;
            console.log(a);
            if(cpy.length > 2 && cpy.length < 8) {
                setCanNext(true);
            }
            else if(canNext) {
                setCanNext(false);
            }
        }
        if(activeStep === 3) {
            if(bio.length > 4 && bio.length < 100) {
                setCanNext(true);
            }
            else if(canNext) {
                setCanNext(false);
            }
        }
    }

    const getMe = () => {
        const headers = new Headers();
        headers.append('x-xsrf-token', window.location.search.split('=')[1]);
        const options = {
        method: 'GET',
        mode: 'cors',
        headers,
        credentials: 'include'
        };
        fetch('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/users/me', options)
            .then(function(response) {
                setMe(response.body);
                console.log(me);
            })
        }

    const handleChangeDate = (value) => {
        setValueDate(value);
    };

    const handleChangeGender = (value) => {
        setValueGender(value);
    };

    const handleNext = async () => {
        if(activeStep === 3) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);

              });

        const headers = new Headers();
        headers.append('x-xsrf-token', window.location.search.split('=')[1]);
        headers.append('Content-Type', 'application/json');

        const body = {
            genre: valueGender,
            interested: state,
            images: JSON.parse(images),
            tags: JSON.parse(tagsjson),
            bio: bio
        }
        const options = {
        method: 'POST',
        mode: 'cors',
        headers,
        body: JSON.stringify(body),
        credentials: 'include'
        };
        fetch('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/users/completeProfile', options)
            .then(function(response) {
                console.log(response);
                window.location = 'http://' + window.location.href.split('/')[2].split(':')[0] + ':3000/home'
            })
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setCanNext(false);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        // setCanNext(false);
    };

    const handleChangeImage = (value) => {
        setImages(JSON.stringify(value));
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
                {activeStep === 0 &&
                    <Orientation interesstedChange={handleChangeInteressted} genderChange={handleChangeGender} dateChange={handleChangeDate} gender={valueGender} h={state.homme} f={state.femme} n={state.nonBinaire} date={valueDate}/>}
                {activeStep === 1 &&
                    <ImageChoose onChange={handleChangeImage} images={JSON.parse(images)}/>}
                {activeStep === 2 &&
                    <TagChoice onChange={setTagsjson} />
                }
                {activeStep === 3 &&
                    <Bio onChange={setBio} defaultValue={bio} />
                }
                <Grid className={'ButtonDiv'}>
                    {activeStep !== 0 &&
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
                        {/* {canNext ?
                            <Button onClick={() => { handleNext(), updateProfil() }} className={"ButtonNextEnable"} >
                                {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                            </Button>
                            :
                            <Button disabled onClick={() => { handleNext(), updateProfil() }} className={"ButtonNextDisable"} >
                                {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                            </Button>
                        } */}
                        <Button onClick={() => { handleNext(), updateProfil() }} className={"ButtonNextEnable"} >
                                {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                            </Button>
                        <Button onClick={() => { getMe() }} className={"ButtonNextEnable"} >
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
