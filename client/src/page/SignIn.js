import React, { useRef, useState } from "react";
import "../styles/SignIn.css";
import {
    TextField,
    Button,
    Grid,
    Container,
    Typography,
    FormControl
}
from '@mui/material';
import { Link } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form';

function SignIn() {

    const { control: controlLogin, handleSubmit: handleSubmitLogin } = useForm();
    const { control: controlForgetPassword, handleSubmit: handleSubmitForgetPassword } = useForm();
    const [activeStep, setActiveStep] = useState(0);


    const onSubmitLogin = (dataLogin) => {
        console.log(dataLogin);
        axios.post('http://' + window.location.href.split('/')[2].split(':')[0] + ':667/auth/signup', dataSubscription ,{withCredentials: true}).then(res => {
				const {xsrfToken} = res.data;
				localStorage.setItem('xsrfToken', JSON.stringify(xsrfToken));
			})
    }

    const onSubmitForgetPassword = (dataForget) => {
        console.log(dataForget);
    }

    return (
        <Container maxWidth={false} >
            <Grid container columns={12} spacing={3} >
                <Grid item xs={12} sm={12} md={12} className={'Title'}>
                    <Typography variant="h1" className={'GeeTitlePart1'}> Gee</Typography><Typography className={'CoeurTitlePart2'} variant="h1"> Coeur</Typography>
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
                        <Grid item xs={12} sm={12} md={12} className={'ForgetPassword'}>
                            <Button className={'ButtonPassword'} onClick={() => { setActiveStep(1) }}>Mot de passe oublié</Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={'ConnexionInscriptionButton'}>
                            <Button className={"ButtonConnexion"} type="submit">
                                Connexion
                            </Button>
                            <Button className={"ButtonInscription"} onClick={() => { setActiveStep(2) }}>
                                <Link to="/subscription" className={'LinkSubscription'}>Inscription</Link>
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
                    : <> </>
            }

        </Container>

    );

}
export default SignIn;
