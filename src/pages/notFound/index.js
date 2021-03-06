import React from 'react'

import { Header, LButton } from '../../components';
import NotFoundImg from '../../assets/images/svg/404.svg';
import { NotFoundSection, NotFoundImage, NotFoundTitle, NotFoundText } from './notFoundElements';

const NotFound = () => {
    return (
        <>
            <Header/>
            <NotFoundSection>
                <NotFoundImage src={NotFoundImg}/>
                <NotFoundTitle>Página não encontrada</NotFoundTitle>
                <NotFoundText>Desculpe não conseguimos encontrar a página que você está procurando</NotFoundText>
                <LButton primary={1} large={1} redirectTo="/">Voltar</LButton>
            </NotFoundSection>
        </>
    )
}

export default NotFound
