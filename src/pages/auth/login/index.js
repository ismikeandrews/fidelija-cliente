import React, { useState } from 'react';
import { 
    TextField, 
    Snackbar, 
    AppBar, 
    Toolbar, 
    IconButton, 
    Typography, 
    Slide, 
    Box, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle 
} from '@material-ui/core';

import { Button as MuiButton } from '@material-ui/core'

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import InputMask from 'react-input-mask';
import { cpf as vcpf, cnpj as vcnpj } from 'cpf-cnpj-validator';

import { addressService, authService, cnpjService, userService } from '../../../services'
import { 
    Footer, 
    Button,
    LButton,
    Header, 
    ScrollToTop 
} from '../../../components';

import { 
    Container, 
    FormContainer, 
    LoginForm, 
    RegisterForm, 
    Title, 
    InputField, 
    LoginRegister, 
    PanelContainer, 
    PanelLeft, 
    PanelRight, 
    SubTitle,
    Paragraph,
    ContentRight,
    ImageRight,
    ContentLeft,
    ImageLeft,
    AccessWrapper,
} from './LoginElements';

import LoginIcon from '../../../assets/images/svg/login.svg';
import RegisterIcon from '../../../assets/images/svg/register.svg';
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
  }));
  

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3}>
                {children}
            </Box>
        )}
        </div>
    );
}

export default function Login(props){
    const [registerMode, setRegisterMode] = useState(false);
    const [stabliment, setStabliment] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toggleSnack, setToggleSnack] = useState(false);
    const [ownerName, setOwnername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [toggleRegisterFields, setToggleRegisterFields] = useState(true);
    const [address, setAddress] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');
    const [complementation, setComplementation] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };


    const submitLogin = async () => {
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
            let res = await authService.authenticate(data);
            await authService.setLoggedUser(res.data);
            window.location.reload()
        } catch (error) {
            console.log(error)
            setToggleSnack(true)
            handleClickOpen();
        }
    }

    const submitRegister = async () => {
        try {
            const registerData = {
                name :  ownerName,
                email : registerEmail,
                cpf : cpf,
                password : registerPassword,
                stablishment_name : stabliment,
                stablishment_cnpj : cnpj,
                address_street: address,
                address_zip: postalCode,
                address_state: uf,
                address_neighborhood: neighborhood,
                address_city: city,
                address_number: number,
                address_complementation: complementation,
            }

            const userRes = await authService.setNewUser(registerData);

            let data = {
                username: userRes.data.email,
                password: registerPassword,
                scope: "*",
                client_id: 1,
                grant_type: "password",
                client_secret: "IQLstf5Jhow51iiBGDxp9BPxlfMDwLvnxrsTF6n6"
            }
            handleClickOpen()
        } catch (error) {
            console.log(error)
        }
    }

    const valition = data => {
        vcpf.isValid(cpf);
        vcnpj.isValid (cnpj)
    }

    const closeSnack = () => {
        setToggleSnack(false)
    }

    const checkcpf = async () => {
        const res = await authService.cpfVerifier(cpf);
        setToggleRegisterFields(res.data === 1 ? false : true)
    }

    const searchPostalCode = async () => {
        const res = await addressService.getAddress(postalCode)
        setPostalCode(res.data.cep)
        setAddress(res.data.logradouro)
        setNeighborhood(res.data.bairro)
        setCity(res.data.localidade)
        setUf(res.data.uf)
    }
    
    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
    };

    const resendEmail = async () => {
        const data = {
            email: 'michaelcl98@hotmail.com'
        }
        try {
            await userService.resendLink(data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>  
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle disableTypography>
                    <Typography variant="h6">Validação de email</Typography>
                        <IconButton aria-label="close" onClick={handleClose} className={classes.closeButton}>
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
                        Reenviar o link
                    </MuiButton>
                    <MuiButton onClick={handleClose} color="secondary">
                        Continuar
                    </MuiButton>
                </DialogActions>
            </Dialog>

            <Header/>
            <Snackbar open={toggleSnack} autoHideDuration={3500} onClose={() => closeSnack()}  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={closeSnack} severity="error" variant="filled">
                    Ocorreu um erro ao tentar efetuar o login
                </Alert>
            </Snackbar>
            <Container className={registerMode === true ? "register-mode" : ""}>
                <FormContainer>
                    <LoginRegister className={registerMode === true ? "register-mode" : ""}>
                        <LoginForm className={registerMode === true ? "register-mode" : ""}>
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

                        <RegisterForm className={registerMode === true ? "register-mode" : ""}>
                            <Title>Cadastro</Title>
                            <Paper className={classes.root}>
                                <Tabs
                                    value={tabValue}
                                    onChange={handleTabChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    centered>
                                        <Tab label="Dados Cadastrais" {...a11yProps(0)} />
                                        <Tab label="Dados da empresa" {...a11yProps(1)} />
                                </Tabs>
                            </Paper>
                            <TabPanel value={tabValue} index={0}>
                                <InputMask mask="999.999.999-99" value={cpf} onChange={(e) => setCpf(e.target.value)} onBlur={() => checkcpf()} >
                                    {(props) => (
                                        <InputField>
                                            <TextField 
                                                label="CPF" 
                                                type="text"
                                                variant="outlined"
                                                />
                                        </InputField>
                                    )}
                                </InputMask>
                                
                                {toggleRegisterFields && (
                                    <>
                                        <InputField>
                                            <TextField 
                                                label="Nome" 
                                                type="text"
                                                variant="outlined"
                                                value={ownerName}
                                                onChange={(e) => setOwnername(e.target.value)}/>
                                        </InputField>
                                        <InputField>
                                            <TextField 
                                                label="Email" 
                                                type="text"
                                                variant="outlined"
                                                value={registerEmail}
                                                onChange={(e) => setRegisterEmail(e.target.value)}/>
                                        </InputField>
                                    </>
                                )}
                                <InputField>
                                    <TextField
                                    label="Senha"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}/>
                                </InputField>
                                {toggleRegisterFields && (
                                <InputField>
                                        <TextField
                                            label="Confirmar senha"
                                            type="password"
                                            autoComplete="current-password"
                                            variant="outlined"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}/>
                                    </InputField>
                                )}
                                   
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                <InputMask mask="99.999.999/9999-99" value={cnpj} onChange={(e) => setCnpj(e.target.value)}>
                                    {(props) => (
                                        <InputField>
                                            <TextField 
                                                label="CNPJ" 
                                                type="text"
                                                variant="outlined"
                                                />
                                        </InputField>
                                    )}
                                </InputMask>
                                <InputField>
                                    <TextField 
                                        label="Nome Fantasia" 
                                        type="text"
                                        variant="outlined"
                                        value={stabliment}
                                        onChange={(e) => setStabliment(e.target.value)}/>
                                </InputField>
                                <InputMask mask="99999-999" value={postalCode} onBlur={() => searchPostalCode()} onChange={(e) => setPostalCode(e.target.value)}>
                                    {(props) => (
                                        <InputField>
                                            <TextField label="CEP" type="text" variant="outlined" required/>
                                        </InputField>
                                    )}
                                </InputMask>
                                <InputField>
                                    <TextField
                                    label="Logradouro"
                                    type="text"
                                    variant="outlined"
                                    value={address}
                                    disabled/>
                                </InputField>
                                <InputField>
                                    <TextField
                                    label="Cidade"
                                    type="text"
                                    variant="outlined"
                                    value={city}
                                    disabled/>
                                </InputField>
                                <InputField>
                                    <TextField
                                    label="Estado"
                                    type="text"
                                    variant="outlined"
                                    value={uf}
                                    disabled/>
                                </InputField>
                                <InputField>
                                    <TextField
                                    label="Bairro"
                                    type="text"
                                    variant="outlined"
                                    value={neighborhood}
                                    disabled/>
                                </InputField>
                                <InputField>
                                    <TextField
                                    label="Numero"
                                    required
                                    type="text"
                                    variant="outlined"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}/>
                                </InputField>
                                <InputField>
                                    <TextField
                                    label="Complemento"
                                    type="text"
                                    variant="outlined"
                                    value={complementation}
                                    onChange={(e) => setComplementation(e.target.value)}/>
                                </InputField>
                                <Button onClick={() => submitRegister()} primary={1} large={1}>Continuar</Button> 
                            </TabPanel>
                        </RegisterForm>
                    </LoginRegister>
                </FormContainer>
                <PanelContainer>
                    <PanelLeft className={registerMode === true ? "register-mode" : ""}>
                        <ContentLeft className={registerMode === true ? "register-mode" : ""}>
                            <SubTitle className="subtitle">Comece agora seu plano de fidelidade grátis</SubTitle>
                            {/* <Paragraph className="reponsive">Lorem ipsum dolor sit amet consectetur adiposocong elit. Minus impedt quidem quibusadam?</Paragraph> */}
                            <Button onClick={() => setRegisterMode(true)} primary={0} large={0}>Cadastre-se</Button>
                        </ContentLeft>
                        <ImageLeft src={LoginIcon} className={registerMode === true ? "register-mode" : ""} alt="login icon"/>
                    </PanelLeft>
                    <PanelRight className={registerMode === true ? "register-mode" : ""}>
                        <ContentRight className={registerMode === true ? "register-mode" : ""}>
                            <SubTitle>Já possui cadastro ?</SubTitle>
                            <Paragraph>Lorem ipsum dolor sit amet consectetur adiposocong elit. Minus impedt quidem quibusadam?</Paragraph>
                            <Button onClick={() => setRegisterMode(false)} primary={0} large={0}>Login</Button>
                        </ContentRight>
                        <ImageRight src={RegisterIcon} className={registerMode === true ? "register-mode" : ""} alt="register icon"/>
                    </PanelRight>
                </PanelContainer>
            </Container>
            <Footer/>
        </>
    );
};

