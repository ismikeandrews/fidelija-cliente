import styled from 'styled-components';

import { colorSchema } from '../../../components';

export const MainSection = styled.section`
    flex: 1;
    display: flex;
    align-items: center;

    @media screen and (max-width: 650px){
        flex-direction: column;
    }
`;

export const LeftSection = styled.section`
    max-width: 45%;
    padding: 40px 64px;

    @media screen and (max-width: 800px){
        padding-left: 40px;
        padding-right: 40px;
    };

    @media screen and (max-width: 650px){
        width: 100%;
        max-width: 100%;
        padding: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 0.8em;
    }
`;

export const RightSection = styled.section`
    padding: 40px 48px;

    @media screen and (max-width: 800px){
        padding-left: 40px;
        padding-right: 40px;
    };

    @media screen and (max-width: 650px){
        width: 100%;
        max-width: 100%;
        padding: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const RightSectionImg = styled.img`
    width: 100%;
    @media screen and (max-width: 650px){
        width: 80%;
    }
`;

export const Title = styled.h2`
    color: ${colorSchema.lsecondary};
    font-size: 3.2em;
    width: 50%;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 48px;
    @media screen and (max-width: 650px){
        width: 100%;
        text-align: center;
        margin-bottom: 32px;
    }
`;

export const Msg = styled.p`
    color: ${ colorSchema.black };
    font-size: 1.1em;
    letter-spacing: 0.7px;
    line-height: 32px;
    margin-bottom: 48px;
    @media screen and (max-width: 650px){
        width: 100%;
        text-align: center;
        margin-bottom: 32px;
    }
`;



