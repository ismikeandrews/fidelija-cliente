import React, { useState } from 'react';
import { TextField, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import InputMask from 'react-input-mask';

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
import { register } from 'react-scroll/modules/mixins/scroller';


export default function Login(props){
    const [registerMode, setRegisterMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toggleSnack, setToggleSnack] = useState(false);
    const [ownerName, setOwnername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

    const submitRegister = async () => {
        try {
            const registerData = {
                name: ownerName,
                email: registerEmail,
                cpf: cpf,
                password: registerPassword
            }
            await authService.setNewUser(registerData);
            let loginData = {
                username: registerEmail,
                password: registerPassword,
                scope: "*",
                client_id: 1,
                grant_type: "password",
                client_secret: "IQLstf5Jhow51iiBGDxp9BPxlfMDwLvnxrsTF6n6"
            }
            let res = await authService.authenticate(loginData);
            await authService.setLoggedUser(res.data);
            props.history.push("/dashboard/home");
        } catch (error) {
            console.log(error)
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

                            <InputMask mask="999.999.999-99" value={cpf} onChange={(e) => setCpf(e.target.value)}>
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

                            <InputField>
                                <TextField
                                label="Senha"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}/>
                            </InputField>
                            <InputField>
                                <TextField
                                label="Confirmar senha"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </InputField>
                            <LButton onClick={() => submitRegister()} primary={1} large={1}>Continuar</LButton>
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