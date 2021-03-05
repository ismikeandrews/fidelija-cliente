import React from 'react';

import { 
    Navbar, 
    NavbarContainer, 
    NavLogo
} from './headerElements';

export default function Header(){
    return (
        <Navbar>
            <NavbarContainer>
                <NavLogo to="/">Logo</NavLogo>
            </NavbarContainer> 
        </Navbar>
    );
};
