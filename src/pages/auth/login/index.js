import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

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
    Btn, 
    LoginRegister, 
    PanelContainer, 
    PanelLeft, 
    PanelRight, 
    SubTitle,
    Paragraph,
    PanelBtn,
    ContentRight,
    ImageRight,
    ContentLeft,
    ImageLeft
} from './LoginElements';
import LoginIcon from '../../../assets/images/svg/login.svg';
import RegisterIcon from '../../../assets/images/svg/register.svg';

export default function Login(){
    const [registerMode, setRegisterMode] = useState(false);

    return (
        <>  
            <ScrollToTop/>
            <Header/>
            <Container className={registerMode === true ? "register-mode" : ""}>
                <FormContainer>
                    <LoginRegister className={registerMode === true ? "register-mode" : ""}>
                        <LoginForm className={registerMode === true ? "register-mode" : ""}>
                            <Title>Login</Title>
                            <InputField>
                                <TextField 
                                    id="outlined-basic" 
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
                            <Button primary={true} large={true}>Entrar</Button>
                        </LoginForm>

                        <RegisterForm className={registerMode === true ? "register-mode" : ""}>
                            <Title>Cadastro</Title>
                            <InputField>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Username" 
                                    type="text"
                                    variant="outlined"/>
                            </InputField>
                            <InputField>
                                <TextField 
                                    id="outlined-basic" 
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
                            <LButton redirectTo="/register" primary={true} large={true}>Continuar</LButton>
                        </RegisterForm>
                    </LoginRegister>
                </FormContainer>
                <PanelContainer>
                    <PanelLeft className={registerMode === true ? "register-mode" : ""}>
                        <ContentLeft className={registerMode === true ? "register-mode" : ""}>
                            <SubTitle className="subtitle">Novo por aqui ?</SubTitle>
                            <Paragraph className="reponsive">Lorem ipsum dolor sit amet consectetur adiposocong elit. Minus impedt quidem quibusadam?</Paragraph>
                            <Button onClick={() => setRegisterMode(true)} primary={false} large={false}>Cadastre-se</Button>
                        </ContentLeft>
                        <ImageLeft src={LoginIcon} className={registerMode === true ? "register-mode" : ""} alt="login icon"/>
                    </PanelLeft>
                    <PanelRight className={registerMode === true ? "register-mode" : ""}>
                        <ContentRight className={registerMode === true ? "register-mode" : ""}>
                            <SubTitle>Já possui cadastro ?</SubTitle>
                            <Paragraph>Lorem ipsum dolor sit amet consectetur adiposocong elit. Minus impedt quidem quibusadam?</Paragraph>
                            <Button onClick={() => setRegisterMode(false)} primary={false} large={false}>Login</Button>
                        </ContentRight>
                        <ImageRight src={RegisterIcon} className={registerMode === true ? "register-mode" : ""} alt="register icon"/>
                    </PanelRight>
                </PanelContainer>
            </Container>
            <Footer/>
        </>
    );
};