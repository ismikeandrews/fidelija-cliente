import React from 'react';
import { CardFormSvg, CashbackSvg, ShoppingSvg } from '../../../../../Assets';


import { 
    ServicesContainer, 
    ServicesH1, 
    ServicesWrapper, 
    ServicesCard, 
    ServicesIcon, 
    ServicesH2, 
    ServicesP
} from './servicesElements';

const ServiceSection = () => {
    return (
        <ServicesContainer id="services">
            <ServicesH1>Lorem Ipsum</ServicesH1>
            <ServicesWrapper>
                <ServicesCard>
                    <ServicesIcon src={CardFormSvg}/>
                    <ServicesH2>Acumulação de pontos</ServicesH2>
                    <ServicesP></ServicesP>
                </ServicesCard>

                <ServicesCard>
                    <ServicesIcon src={CashbackSvg}/>
                    <ServicesH2>Gerenciamento de prêmios</ServicesH2>
                    <ServicesP>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae mauris at orci consectetur congue.</ServicesP>
                </ServicesCard>

                <ServicesCard>
                    <ServicesIcon src={ShoppingSvg}/>
                    <ServicesH2>Fidelização de clientes</ServicesH2>
                    <ServicesP>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae mauris at orci consectetur congue.</ServicesP>
                </ServicesCard>
            </ServicesWrapper>
        </ServicesContainer>
    );
};

export default ServiceSection;