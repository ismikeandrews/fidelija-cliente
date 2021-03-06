import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';

import { colorSchema } from '../../../../components';

export const Navbar = styled.div`
    background: ${({scrollNav}) => (scrollNav ? colorSchema.black : 'transparent')};
    box-shadow: ${({scrollNav}) => (scrollNav ? '0px 6px 21px 6px rgb(0 0 0 / 35%)' : '')};
    border-radius: 0 0 10px 10px;
    height: 80px;
    margin-top: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
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

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 768px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
        color: ${colorSchema.white};
    };
`;

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: -22px;

    @media screen and (max-width: 768px){
        display: none;
    };
`;

export const NavItem = styled.li`
    height: 80px;
`;

export const NavLinks = styled(LinkS)`
    color: ${colorSchema.white};
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    
    &.active {
        border-bottom: 3px solid ${colorSchema.lprimary};
    };
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    
    @media screen and (max-width: 768px){
        display: none;
    };
`;

export const LogoImg = styled.img`
    width: 120px;
`