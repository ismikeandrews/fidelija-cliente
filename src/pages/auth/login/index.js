import React, { useState } from 'react';
import { TextField, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { authService } from '../../../services'
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


export default function Login(props){
    const [registerMode, setRegisterMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toggleSnack, setToggleSnack] = useState(false);

    const submitLogin = async () => {
        let data = {
            username: email,
            password: password,
            scope: "*",
            client_id: 1,
            grant_type: "password",
            client_secret: "IQLstf5Jhow51iiBGDxp9BPxlfMDwLvnxrsTF6n6"
        }
        try {
            let res = await authService.authenticate(data);
            await authService.setLoggedUser(res.data);
            props.history.push("/dashboard/home");
        } catch (error) {
            console.log(error)
            setToggleSnack(true)
        }
    }

    const closeSnack = () => {
        setToggleSnack(false)
    }

    return (
        <>  
            <ScrollToTop/>
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
                            <InputField>
                                <TextField 
                                    label="Username" 
                                    type="text"
                                    variant="outlined"/>
                            </InputField>
                            <InputField>
                                <TextField 
                                    label="Email" 
                                    type="text"
                                    variant="outlined"/>
                            </InputField>
                            <InputField>
                                <TextField
                                label="Senha"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"/>
                            </InputField>
                            <LButton redirectTo="/register" primary={1} large={1}>Continuar</LButton>
                        </RegisterForm>
                    </LoginRegister>
                </FormContainer>
                <PanelContainer>
                    <PanelLeft className={registerMode === true ? "register-mode" : ""}>
                        <ContentLeft className={registerMode === true ? "register-mode" : ""}>
                            <SubTitle className="subtitle">Novo por aqui ?</SubTitle>
                            <Paragraph className="reponsive">Lorem ipsum dolor sit amet consectetur adiposocong elit. Minus impedt quidem quibusadam?</Paragraph>
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