import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    TextField, 
    IconButton, 
    Typography, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle,
    Container,
    Grid,
    Box,
    Button,
    Paper
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AuthService, UserService } from '../../../Services';
import { Header, Snackbar, Backdrop } from '../../../Components';
import { Logo } from '../../../Assets';
import { getToken } from '../../../firebase'
import { Styles } from './login.elements'

export default function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const [toggleSuccess, setToggleSuccess] = useState(false);
    const [toggleFailure, setToggleFailure] = useState(false);

    const classes = Styles();

    const submitLogin = async () => {
        setIsLoading(true);
        let data = {
            username: email,
            password: password,
            scope: "*",
            client_id: 1,
            grant_type: "password",
            client_secret: "IQLstf5Jhow51iiBGDxp9BPxlfMDwLvnxrsTF6n6",
            fcm: await getToken()
        }
        try {
            const authRes = await AuthService.authenticate(data);
            const userRes = await AuthService.getUser(authRes.data);
            if(userRes.data.stablishment){
                await AuthService.setLoggedUser(userRes.data, authRes.data);
                setIsLoading(false);
                window.location.reload()
            }else{
                setIsLoading(false);
                setInfoMsg('Acesso não autorizado');
                setToggleFailure(true);
            }
        } catch (error) {
            if (error.response.status === 403) {
                setOpen(true);
                setIsLoading(false);
            }
            setIsLoading(false);
            setInfoMsg("Não foi possivel fazer o login, verifique os dados e tente novamente.");
            setToggleFailure(true);
        }
    }

    const resendEmail = async () => {
        setIsLoading(true);
        const data = {email: email}
        try {
            await UserService.resendLink(data);
            setIsLoading(false);
            setInfoMsg("Email de confirmação enviado");
            setToggleSuccess(true);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            setInfoMsg("Ocorreu um erro ao enviar o email, tente novamente mais tarde");
            setToggleFailure(true)
        }
    }

    return (
        <>  
            <Backdrop open={isLoading}/>
            <Snackbar toggleSnack={toggleSuccess || toggleFailure} time={toggleFailure ? 4500 : 3500} onClose={() => {setToggleFailure(false); setToggleSuccess(false)}}  color={toggleSuccess ? "success" : "warning"}>
                {infoMsg}
            </Snackbar>
            <Dialog onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle disableTypography>
                    <Typography variant="h6">Validação de email</Typography>
                        <IconButton aria-label="close" onClick={() => setOpen(false)} className={classes.closeButton}>
                            <CloseIcon />
                        </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Verifique a sua caixa de email e acesse o link de confirmação.
                    </Typography>
                    <Typography gutterBottom>
                        Confira o lixo eletronico e a caixa de spam.
                    </Typography>
                    <Typography gutterBottom>
                        Realize o login após a confirmação
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => resendEmail()} color="primary">
                        Reenviar link
                    </Button>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Continuar
                    </Button>
                </DialogActions>
            </Dialog>
            <Header/>
            <Container component="main" maxWidth="xs">
                <Paper variant="outlined" className={classes.paper}>
                    <img src={Logo} alt="Fidelijá" className={classes.logo}/>
                    <Typography component="h1" variant="h5">
                        Login Logista
                    </Typography>
                    <div className={classes.form} >
                        <TextField fullWidth margin="normal" required label="Email" type="text" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <TextField fullWidth margin="normal" required label="Senha" type="password" autoComplete="current-password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={() => submitLogin()}>
                            Entrar
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link className={classes.links} to="/recover" variant="body2">
                                    Esqueceu a senha?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link className={classes.links} to="/register" variant="body2">
                                    Cadastre-se aqui
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
                <Box mt={8}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {'Copyright © '}
                        <a className={classes.links} color="inherit" href="https://fidelija.com.br/">
                            Fidelijá
                        </a>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

