import React from 'react';

import { LButton } from '../../../../components';
import { 
    MenuContainer, 
    Icon, 
    TimesIcon, 
    MenuWrapper, 
    MenuLink, 
    MenuBtnWrap, 
    SidebarMenu 
} from './MenuElements';

export default function Menu({ isOpen, toggle }){
    return(
        <MenuContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <TimesIcon/>
            </Icon>
            <MenuWrapper>
                <SidebarMenu>
                    <MenuLink to="about" onClick={toggle}>Sobre</MenuLink>
                    <MenuLink to="discover" onClick={toggle}>Como Funciona</MenuLink>
                    <MenuLink to="services" onClick={toggle}>Serviços</MenuLink>
                    <MenuLink to="/register" onClick={toggle}>Cadastro</MenuLink>
                    <MenuLink to="subscriptions" onClick={toggle}>Planos</MenuLink>
                </SidebarMenu>
                <MenuBtnWrap>
                    <LButton redirectTo="/login" primary={true} large={true}>Entrar</LButton>
                </MenuBtnWrap>
            </MenuWrapper>
        </MenuContainer>
    );
}