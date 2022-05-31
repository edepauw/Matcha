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
    FormGroup,
    Input,
    Modal
}
    from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from "react-hook-form";
import AvatarEditor from 'react-avatar-editor';

function CreationAccountPage() {

    const { handleSubmit } = useForm();
    const steps = ['Informations Personnel', 'Photos', 'Tags', 'Bio'];
    const [activeStep, setActiveStep] = useState(1);
    const [valueGender, setValueGender] = useState('');
    const [valueDate, setValueDate] = useState('');
    const [files, setFiles] = useState([]);
    const [addFiles, setAddFiles] = useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const onImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            let tempFiles = files;
            tempFiles.push(URL.createObjectURL(img));
            console.log(tempFiles);
            setFiles(tempFiles);
            setAddFiles(true);
        }
        console.log(files);
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

                        <Grid container columns={12} spacing={7} className={'Photo'}>
                            <Grid item xs={12} sm={8} md={8} className={'PhotoGridTitle'}>
                                <Typography variant='h5' id="demo-radio" className={'TitlePhoto'}>Photo</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={'PhotoGridButton'}>
                                <Grid item xs={12} sm={3} md={2} className={'PhotoGrid'}>
                                    <label htmlFor="contained-button-file">
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            sx={{ display: 'none' }}
                                            onChange={onImageUpload}
                                        />
                                        <Button variant="contained" className={'ButtonPhotoPP'} component="span"><AddIcon className={'AddIcon'} /></Button>
                                        <Button onClick={handleOpen}>resize</Button>
                                    </label>
                                    <label htmlFor="contained-button-file1">
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file1"
                                            multiple
                                            type="file"
                                            sx={{ display: 'none' }}
                                            onChange={onImageUpload}
                                        />
                                        <Button variant="outlined" className={'ButtonPhoto'} component="span"><AddIcon className={'AddIcon'} /></Button>
                                    </label>
                                </Grid>
                                <Grid item xs={12} sm={3} md={2} className={'PhotoGrid'}>
                                    <label htmlFor="contained-button-file2">
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file2"
                                            multiple
                                            type="file"
                                            sx={{ display: 'none' }}
                                            onChange={(event) => {
                                                let tempFiles = files;
                                                tempFiles.push(event.target.files[0]);
                                                setFiles(tempFiles);
                                                console.log(files)
                                            }}
                                        />
                                        <Button variant="outlined" className={'ButtonPhoto'} component="span"><AddIcon className={'AddIcon'} /></Button>
                                    </label>
                                    <label htmlFor="contained-button-file3">
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file3"
                                            multiple
                                            type="file"
                                            sx={{ display: 'none' }}
                                            onChange={(event) => {
                                                let tempFiles = files;
                                                tempFiles.push(event.target.files[0]);
                                                setFiles(tempFiles);
                                                console.log(files)
                                            }}
                                        />
                                        <Button variant="outlined" className={'ButtonPhoto'} component="span"><AddIcon className={'AddIcon'} /></Button>
                                    </label>
                                </Grid>
                                <Grid item xs={12} sm={3} md={2} className={'PhotoGrid'}>
                                    <label htmlFor="contained-button-file4">
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file4"
                                            multiple
                                            type="file"
                                            sx={{ display: 'none' }}
                                            onChange={(event) => {
                                                let tempFiles = files;
                                                tempFiles.push(event.target.files[0]);
                                                setFiles(tempFiles);
                                                console.log(files)
                                            }}
                                        />
                                        <Button variant="outlined" className={'ButtonPhoto'} component="span"><AddIcon className={'AddIcon'} /></Button>
                                    </label>
                                    <label htmlFor="contained-button-file5">
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file5"
                                            multiple
                                            type="file"
                                            sx={{ display: 'none' }}
                                            onChange={(event) => {
                                                let tempFiles = files;
                                                tempFiles.push(event.target.files[0]);
                                                setFiles(tempFiles);
                                                console.log(files)
                                            }}
                                        />
                                        <Button variant="outlined" className={'ButtonPhoto'} component="span"><AddIcon className={'AddIcon'} /></Button>
                                    </label>
                                </Grid>
                            </Grid>
                        </Grid>

                        : activeStep === 2 ?

                            <Grid container columns={12} spacing={3} className={''}>

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
                        {valueGender != '' && valueDate != '' && error ?
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

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className={'ModalPhoto'}>
                        <Grid className={'GridModal'}>
                            <AvatarEditor
                                sx={{margin: 'auto'}}
                                image={files[0]}
                                width={250}
                                height={250}
                                border={50}
                                color={[255, 255, 255, 0.6]}
                                scale={1.2}
                                rotate={0}
                            />
                        </Grid>
                    </Box>
                </Modal>
            </Grid>
        </Container>

    );
}

export default CreationAccountPage;

// WEBPACK FOOTER //
// src/Loginform/LoginForm.js