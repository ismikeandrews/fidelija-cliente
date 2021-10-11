import styled from 'styled-components';

import{ colorSchema } from '../../../Styles/colorSchema';

export const NotFoundSection = styled.section`
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50%, -60%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media screen and (max-width: 600px){
        width: 100%;
    };
`;

export const NotFoundImage = styled.img`
    height: 300px;
    background-color: ${colorSchema.white};

    @media screen and (max-width: 900px){
        height: 180px;
    };

    @media screen and (max-width: 600px){
        height: 120px;
    }
`;

export const NotFoundTitle = styled.h2`
    color: ${colorSchema.black};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1.8rem;
    margin: 50px 0 0 0;
    text-align: center;
    @media screen and (max-width: 600px){
        font-size: 1.3rem;
    };
`;

export const NotFoundText = styled.p`
    color: #808080;
    font-size: 1rem;
    width: 60%;
    text-align: center;
    margin: 5px;
    font-weight: 300;
    margin-bottom: 15px;

    @media screen and (max-width: 900px){
        width: 100%;
    };

    @media screen and (max-width: 600px){
        width: 90%;
    }
`