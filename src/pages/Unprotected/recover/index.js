import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    TextField,
    Button,
    Container,
    Paper,
    Avatar,
    Typography,
    Grid,
    Box
} from '@material-ui/core';
import { Snackbar, Backdrop, Header } from '../../../Components'
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { Styles } from './recover.elements';
import { AuthService } from '../../../Services';

const Recover = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [toggleSuccess, setToggleSuccess] = useState(false);
    const [toggleFailure, setToggleFailure] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const classes = Styles();

    const sendRecover = async () => {
        setIsLoading(true);
        try {
            const data = {
                nome: name,
                email: email
            }
            await AuthService.recoverPassword(data);
            setIsLoading(false);
            setName('');
            setEmail('');
            setInfoMsg('Verifique a caixa de entrada de seu email.');
            setToggleSuccess(true);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setInfoMsg('Não foi possivel enviar a redefinição de senha.');
            setToggleFailure(true);
        }
    }

    return (
        <div>
            <Backdrop open={isLoading}/>
            <Snackbar toggleSnack={toggleSuccess || toggleFailure} time={toggleFailure ? 4500 : 3500} onClose={() => {setToggleFailure(false); setToggleSuccess(false)}}  color={toggleSuccess ? "success" : "warning"}>
                {infoMsg}
            </Snackbar>
            <Header/>
            <Container component="main" maxWidth="xs">
                <Paper variant="outlined" className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Recuperar senha
                    </Typography>
                    <div className={classes.form} >
                        <TextField fullWidth margin="normal" required label="Nome" type="text" variant="outlined" value={name} onChange={(e) => setName(e.target.value)}/>
                        <TextField fullWidth margin="normal" required label="Email" type="text" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={() => sendRecover()}>
                            Solicitar nova de senha
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link className={classes.links} to="/" variant="body2">
                                   Voltar para o login
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
        </div>
    )
}

export default Recover
