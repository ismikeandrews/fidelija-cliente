import React from 'react';

import { 
    Navbar, 
    NavbarContainer, 
    NavLogo,
    LogoImg
} from './headerElements';
import Logo from '../../assets/images/img/fidelija-logo.png';

export default function Header(){
    return (
        <Navbar>
            <NavbarContainer>
                <NavLogo to="/"><LogoImg src={Logo}/></NavLogo>
            </NavbarContainer> 
        </Navbar>
    );
};
