import styled from 'styled-components';
import { Link as LinkS } from 'react-scroll';
import CloseIcon from '@material-ui/icons/Close';

import { colorSchema } from '../../../../components';

export const MenuContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: ${colorSchema.black};
    display: grid;
    align-items: center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ?  '100%' : '0')};
    top: ${({isOpen}) => (isOpen ? '0' : '-100%')};
`;

export const TimesIcon = styled(CloseIcon)`
    color: ${colorSchema.white};
`;

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`;

export const MenuWrapper = styled.div`
    color: ${colorSchema.white};
`;

export const SidebarMenu = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 80px);
    text-align: center;

    @media screen and (max-width: 480px){
        grid-template-rows: repeat(6, 60px);
    };
`;

export const MenuLink = styled(LinkS)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    color: ${colorSchema.white};
    cursor: pointer;

    &:hover{
        color: ${colorSchema.lprimary};
        transition: 0.2s ease-in-out;
    };
`;

export const MenuBtnWrap = styled.div`
    display: flex;
    justify-content: center;
`;