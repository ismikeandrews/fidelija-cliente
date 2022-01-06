import React from 'react';

import { 
    Navbar, 
    NavbarContainer, 
    NavLogo,
    LogoImg
} from './headerElements';
import { Logo } from '../../../Assets';

export default function Header(){
    return (
        <Navbar>
            <NavbarContainer>
                <NavLogo href="https://fidelija.com.br"><LogoImg src={Logo}/></NavLogo>
            </NavbarContainer> 
        </Navbar>
    );
};
