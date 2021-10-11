import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { MenuRounded } from '@material-ui/icons';

import { LButton } from '../../../../../Components';
import { 
    Navbar, 
    NavbarContainer, 
    NavLogo, 
    MobileIcon, 
    NavMenu, NavItem, 
    NavLinks, 
    NavBtn,
    LogoImg
} from './HeaderElements';
import { Logo } from '../../../../../Assets';

export default function Header({toggle}){
    const [scrollNav, setScrollNav] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, []);

    const changeNav = () => {
        if(window.scrollY >= 5){
            setScrollNav(true)
        }else{
            setScrollNav(false)
        };
    }

    const toogleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <Navbar scrollNav={scrollNav}>
            <NavbarContainer>
                <NavLogo to="/" onClick={toogleHome}><LogoImg src={Logo}/></NavLogo>
                <MobileIcon onClick={toggle}>
                    <MenuRounded/>
                </MobileIcon>
                <NavMenu>
                    <NavItem>
                        <NavLinks 
                        to="about"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact="true"
                        offset={-80}>
                            Sobre
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks 
                        to="discover"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact="true"
                        offset={-80}>
                            Como Funciona
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks 
                        to="services"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact="true"
                        offset={-80}>
                            Serviços
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks 
                        to="register"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact="true"
                        offset={-80}>
                            Cadastro
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks 
                        to="subscription"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact="true"
                        offset={-80}>
                            Planos
                        </NavLinks>
                    </NavItem>
                </NavMenu>
                <NavBtn>
                    <LButton redirectTo="/login" primary={1} large={0}>Entrar</LButton>
                </NavBtn>
            </NavbarContainer> 
        </Navbar>
    );
}
