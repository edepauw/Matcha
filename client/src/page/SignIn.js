import React, { useRef, useState } from "react";
import "../styles/SignIn.css";
import {
    TextField,
    Button,
    Grid,
    Container,
    Typography,
    FormControl,
    Snackbar,
}
from '@mui/material';

import { Controller, useForm } from 'react-hook-form';

function SignIn() {

    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);
    const { control: controlLogin, handleSubmit: handleSubmitLogin } = useForm();
    const { control: controlForgetPassword, handleSubmit: handleSubmitForgetPassword } = useForm();
    const { control: controlSubscription, handleSubmit: handleSubmitSubscription } = useForm();
    const [activeStep, setActiveStep] = useState(0);

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmitLogin = (dataLogin) => {
        console.log(dataLogin);
    }

    const onSubmitForgetPassword = (dataForget) => {
        console.log(dataForget);
    }

    const onSubmitSubscription = (dataSubscription) => {
        if (dataSubscription.password != dataSubscription.confirmed_password) {
            setOpen(true);
        }
        console.log(dataSubscription);
    }

return (
    <Container maxWidth={false}>
        <Grid container columns={12} spacing={3} >
            <Grid item xs={12} sm={12} md={12} className={'Title'}>
                <Typography variant="h1" className={'TitlePart1'}> Gee</Typography><Typography className={'TitlePart2'} variant="h1"> Coeur</Typography>
            </Grid>
        </Grid>
        {activeStep == 0 ?
            <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                <Grid container columns={12} spacing={3} >
                    <Grid item xs={12} sm={12} md={12} className={'InputFormLogin'} >
                        <Controller
                            name={"username"}
                            control={controlLogin}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    sx={{ width: '25ch' }}
                                    id="username"
                                    label="Pseudo"
                                    onChange={onChange}
                                    value={value == null ? '' : value}
                                />
                            )}
                        />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <Controller
                                name={"password"}
                                control={controlLogin}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        sx={{ width: '25ch' }}
                                        id="password"
                                        label="Mot de passe"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={onChange}
                                        value={value == null ? '' : value}
                                    />
                                )} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} ms={12} md={12} className={'ForgetPassword'}>
                        <Button className={'ButtonPassword'} onClick={() => { setActiveStep(1) }}>Mot de passe oublié</Button>
                    </Grid>
                    <Grid item xs={12} ms={12} md={12} className={'ConnexionInscriptionButton'}>
                        <Button className={"ButtonConnexion"} type="submit">
                            Connexion
                        </Button>
                        <Button className={"ButtonInscription"} onClick={() => { setActiveStep(2) }}>
                            Inscription
                        </Button>
                    </Grid>
                </Grid>
            </form>
            : activeStep == 1 ?
                <form onSubmit={handleSubmitForgetPassword(onSubmitForgetPassword)}>
                    <Grid item xs={12} sm={12} md={12} className={'TitlePasswordForget'} >
                        <Typography variant="h6" className={'TitlePasswordForgetTypo'}>Mot de passe oublié</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={'InputForm'} >
                        <Controller
                            name={"email"}
                            control={controlForgetPassword}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    sx={{ width: '25ch' }}
                                    id="email-forget-password"
                                    label="Email"
                                    value={value == null ? '' : value}
                                    onChange={onChange}
                                    type="email"
                                />
                            )} />
                    </Grid>
                    <Grid item xs={12} ms={12} md={12} className={'DivButtonForgotPassword'}>
                        <Button className={"ButtonForgotPassword"} type="submit">
                            Envoyer
                        </Button>
                    </Grid>
                </form>
                : activeStep == 2 ?
                    <form onSubmit={handleSubmitSubscription(onSubmitSubscription)}>
                        <Grid item xs={12} sm={12} md={12} className={'TitleSubscription'} >
                            <Typography variant="h6" className={'TitleSubscriptionTypo'}>Inscription</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={'InputForm'} >
                            <Controller
                                name={"email"}
                                control={controlSubscription}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className={'TextFieldSubscription'}
                                        id="email-subscription"
                                        label="Email"
                                        value={value == null ? '' : value}
                                        onChange={onChange}
                                        type="email"
                                        required
                                    />
                                )} />
                            <Controller
                                name={"lastname"}
                                control={controlSubscription}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className={'TextFieldSubscription'}
                                        id="lastname-subscription"
                                        label="Nom"
                                        value={value == null ? '' : value}
                                        onChange={onChange}
                                        required
                                    />
                                )} />
                            <Controller
                                name={"firstname"}
                                control={controlSubscription}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className={'TextFieldSubscription'}
                                        id="firstname-subscription"
                                        label="Prénom"
                                        value={value == null ? '' : value}
                                        onChange={onChange}
                                        required
                                    />
                                )} />
                            <Controller
                                name={"username"}
                                control={controlSubscription}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className={'TextFieldSubscription'}
                                        id="username-subscription"
                                        label="Pseudo"
                                        value={value == null ? '' : value}
                                        onChange={onChange}
                                        required
                                    />
                                )} />
                            <Controller
                                name={"password"}
                                control={controlSubscription}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className={'TextFieldSubscription'}
                                        id="password-subscription"
                                        label="Mot de passe"
                                        value={value == null ? '' : value}
                                        onChange={onChange}
                                        type="password"
                                        required
                                    />
                                )} />
                            <Controller
                                name={"confirmed_password"}
                                control={controlSubscription}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className={'TextFieldSubscription'}
                                        id="confirmed_password-subscription"
                                        label="Confirmation de mot de passe"
                                        value={value == null ? '' : value}
                                        onChange={onChange}
                                        type="password"
                                        required
                                    />
                                )} />
                        </Grid>
                        <Grid item xs={12} ms={12} md={12} className={'DivButtonSubscription'}>
                            <Button className={"ButtonSusciption"} type="submit">
                                Creer mon compte
                            </Button>
                        </Grid>
                    </form>
                    : <> </>
        }

        <Snackbar
            open={open}
            onClose={handleClose}
            TransitionComponent={transition}
            message="Vos mots de passe ne correspondent pas !"
            key={transition ? transition.name : ''}
        />

    </Container>

);

}
export default SignIn;
