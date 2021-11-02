import React, { useState } from 'react';
import { 
    TextField, 
    IconButton, 
    Typography, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle,
    Backdrop,
    CircularProgress,
} from '@material-ui/core';

import { Button as MuiButton } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { AuthService, UserService } from '../../../Services';
import { 
    Footer,
    Button,
    LButton,
    Header,
    Snackbar 
} from '../../../Components';

import { 
    Container, 
    FormContainer, 
    LoginForm, 
    Title, 
    InputField, 
    LoginRegister, 
    PanelContainer, 
    PanelLeft, 
    SubTitle,
    ContentLeft,
    ImageLeft,
    AccessWrapper,
} from './LoginElements';

import { LoginSvg } from '../../../Assets';
import { getToken } from '../../../firebase'

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
  

export default function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const [toggleSuccess, setToggleSuccess] = useState(false);
    const [toggleFailure, setToggleFailure] = useState(false);

    const classes = useStyles();

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
            <Snackbar toggleSnack={toggleSuccess || toggleFailure} time={toggleFailure ? 4500 : 3500} onClose={() => {setToggleFailure(false); setToggleSuccess(false)}}  color={toggleSuccess ? "success" : "warning"}>
                {infoMsg}
            </Snackbar>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
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
                    <MuiButton onClick={() => resendEmail()} color="primary">
                        Reenviar link
                    </MuiButton>
                    <MuiButton onClick={() => setOpen(false)} color="primary">
                        Continuar
                    </MuiButton>
                </DialogActions>
            </Dialog>
            <Header/>
            <Container>
                <FormContainer>
                    <LoginRegister>
                        <LoginForm>
                            <Title>Login</Title>
                            <InputField>
                                <TextField 
                                    label="Email" 
                                    type="text"
                                    variant="outlined"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}/>
                            </InputField>
                            <InputField>
                            <TextField
                                label="Senha"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                            </InputField>
                            <AccessWrapper>
                                <Button primary={1} large={0} onClick={() => submitLogin()}>Entrar</Button>
                                <LButton redirectTo="/" primary={0} large={0}>Esqueceu a Senha?</LButton>
                            </AccessWrapper>
                        </LoginForm>
                    </LoginRegister>
                </FormContainer>
                <PanelContainer>
                    <PanelLeft>
                        <ContentLeft>
                            <SubTitle className="subtitle">Comece agora seu plano de fidelidade grátis</SubTitle>
                            <LButton redirectTo="/register" primary={0} large={0}>Cadastre-se</LButton>
                        </ContentLeft>
                        <ImageLeft src={LoginSvg} alt="login icon"/>
                    </PanelLeft>
                </PanelContainer>
            </Container>
        </>
    );
};

