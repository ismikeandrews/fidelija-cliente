import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colorSchema } from '../../../components'

export const Container = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    background-color: ${colorSchema.white};
    overflow: hidden;

    &:before{
        content: '';
        position: absolute;
        width: 2150px;
        height: 2150px;
        border-radius: 50%;
        background: linear-gradient(-45deg, ${colorSchema.lprimary}, ${colorSchema.dprimary});
        top: -10%;
        right: 48%;
        transform: translateY(-50%);
        z-index: 6;
        transition: 1.8s ease-in-out;
    };

    &.register-mode:before{
        transform: translate(100%, -50%);
        right: 52%;
    };

    @media (max-width: 870px){
        min-height:800px;
        height:100vh;

        &:before{
            width: 1500px;
            height: 1500px;
            left: 30%;
            bottom: 68%;
            transform: translateX(-50%);
            right: initial;
            top: initial;
            transition: 2s ease-in-out;
        };

        &.register-mode:before{
            transform: translate(-50%, 100%);
            bottom: 32%;
            right: initial;
        };
    };

    @media (max-width: 570px){
        &:before{
            bottom: 71%;
            left: 50%;
        };
        &.register-mode:before{
            bottom: 30%;
            left: 50%;
        };
    };
`;

export const FormContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 5rem;
    overflow: hidden;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    transition: 0.2s 0.7s ease-in-out;

    @media (max-width: 570px){
        padding: 0 1.5rem;
    };
`;

export const LoginForm = styled(Form)`
    z-index: 2;

    &.register-mode{
        z-index: 1;
        opacity: 0;
    };
`;

export const RegisterForm = styled(Form)`
    z-index: 1;
    opacity: 0;

    &.register-mode{
        z-index: 2;
        opacity: 1;
    };
`;

export const Title = styled.h2`
    font-size: 2.2.rem;
    color: ${colorSchema.black};
    margin-bottom: 10px;
`;

export const InputField = styled.div`
    max-width: 380px;
    width: 100%;
    height: 55px;
    margin: 10px 0;
    display: grid;
    grid-template-columns: 100%;
`;

export const LoginRegister = styled.div`
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
    width: 50%;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
    transition: 1s 0.7s ease-in-out;

    &.register-mode{
        left: 25%;
    };

    @media (max-width: 870px){
        width: 100%;
        left: 50%;
        top: 70%;
        transform: translate(-50%, -100%);
        transition: 1s 0.8s ease-in-out;

        &.register-mode{
            top: 15%;
            transform: translate(-50%, 0);
            left: 50%;
        };
    };
`;

export const Image = styled.img`
    width: 100%;
    transition: 1.1s .4s ease-in-out;

    @media (max-width: 870px){
        width: 200px;
        transition: 0.9s 0.6s ease-in-out;
    };

    @media (max-width: 570px){
        display: none;
    };
`;

export const PanelContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: 870px){
        z-index: 10;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr 1fr;
    };
`;

const Panel = styled.div`
    display:flex;
    flex-direction:column;
    align-items: flex-end;
    justify-content: space-around;
    text-align: center;
    z-index: 7;
    transition: .9s .6s ease-in-out;

    @media (max-width: 870px){
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 2.5rem 8%;
        transition: 0.9s 0.8s ease-in-out;
        padding-right: 15%;
    };

    @media (max-width: 570px){
        padding: 0.5rem 1rem;
    };
`;

export const PanelLeft = styled(Panel)`
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;

    &.register-mode{
        pointer-events: none;
    };

    @media (max-width: 870px){
        grid-row: 1 / 2;
    };
`;

export const PanelRight = styled(Panel)`
    pointer-events: none;
    padding: 3rem 12% 2rem 17%;

    &.register-mode{
        pointer-events: all;
    };

    @media (max-width: 870px){
        grid-row: 3 / 4;
    };
`;

export const Content = styled.div`
    color: ${colorSchema.white};
    transition: .9s .6s ease-in-out;

    @media (max-width: 870px){
        transition: 0.9s 0.6s ease-in-out;
        padding-right: 15%;
    };
    
    @media (max-width: 570px){
        padding: 0.5rem 1rem;
    };
`;

export const SubTitle = styled.h3`
    font-weight: 400;
    line-height: 1;
    font-size: 2rem;
    margin-bottom: 10px;
`;

export const Paragraph = styled.p`
    font-size: 0.95rem;
    padding: 0.7rem 0;
`;

export const ContentRight = styled(Content)`
    transform: translateX(800px);

    &.register-mode{
        transform: translateX(0px);
    };

    @media (max-width: 870px){
        transform: translateY(300px)
    };
`;

export const ImageRight = styled(Image)`
    transform: translateX(800px);

    &.register-mode{
        transform: translateX(0px);
    };

    @media (max-width: 870px){
        transform: translateY(300px)
    };
`;


export const ContentLeft = styled(Content)`
    &.register-mode{
        transform: translateX(-800px);
    };

    @media (max-width: 870px){
        &.register-mode{
            transform: translateY(-300px)
        };
    };
`;

export const ImageLeft = styled(Image)`
    &.register-mode{
        transform: translateX(-800px);
    };

    @media (max-width: 870px){
        &.register-mode{
            transform: translateY(-300px)
        };
    };
`;

export const AccessWrapper = styled.div`
    margin-top: 15px;
    display: grid;
    grid-gap: 10px;
`

export const RecoverPassword = styled(Link)`
    text-decoration: none;
    color: ${colorSchema.lprimary};
    font-size: 15px;
`
