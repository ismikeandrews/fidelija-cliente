import React from 'react';

import { 
    HeroContainer, 
    HeroBg, 
    HeroContent, 
    HeroH1, 
    HeroP, 
    HeroBtnWrapper, 
    ImgBg 
} from './HeroElements';
import { LButton } from '../../../../components';
import Pay from '../../../../assets/images/img/pay-hero.jpg';
import Bread from '../../../../assets/images/img/bread-hero.jpg';
import Clothing from '../../../../assets/images/img/clothing-hero.jpg';

const HeroSection = () => {
    return (
        <HeroContainer id="home">
            <HeroBg>
                <ImgBg src={Pay}></ImgBg>
            </HeroBg>
            <HeroContent>
                <HeroH1>Fidelização de clientes fácil</HeroH1>
                <HeroP>Cadastre-se de graça hoje mesmo e desfrute dos beneficios</HeroP>
                <HeroBtnWrapper>
                    <LButton redirectTo="/register" primary={1} large={0}>Cadastre-se</LButton>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
};

export default HeroSection;
