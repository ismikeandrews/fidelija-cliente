import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

import { colorSchema } from '../colorSchema';

export const Navbar = styled.div`
    background: ${colorSchema.lprimary};
    box-shadow: 0px 6px 21px 6px rgb(0 0 0 / 35%);
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    top: 0;
    z-index: 10;
    
    @media screen and (max-width: 960px){
        transition: 0.8 all ease;
    };
`;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
`;

export const NavLogo = styled(LinkR)`
    color: ${colorSchema.white};
    justify-self: flex-start;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
`;

export const LogoImg = styled.img`
    width: 120px;
`