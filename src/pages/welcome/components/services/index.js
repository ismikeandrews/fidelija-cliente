import React from 'react';

import Icon1 from '../../../../assets/images/svg/card-form.svg';
import Icon2 from '../../../../assets/images/svg/cashback.svg';
import Icon3 from '../../../../assets/images/svg/shopping.svg';

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
                    <ServicesIcon src={Icon1}/>
                    <ServicesH2>What is Lorem Ipsum?</ServicesH2>
                    <ServicesP>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae mauris at orci consectetur congue.</ServicesP>
                </ServicesCard>

                <ServicesCard>
                    <ServicesIcon src={Icon2}/>
                    <ServicesH2>What is Lorem Ipsum?</ServicesH2>
                    <ServicesP>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae mauris at orci consectetur congue.</ServicesP>
                </ServicesCard>

                <ServicesCard>
                    <ServicesIcon src={Icon3}/>
                    <ServicesH2>What is Lorem Ipsum?</ServicesH2>
                    <ServicesP>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae mauris at orci consectetur congue.</ServicesP>
                </ServicesCard>
            </ServicesWrapper>
        </ServicesContainer>
    );
};

export default  ServiceSection;