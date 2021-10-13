import React from 'react';

import { 
    Button, 
    Footer, 
    Header, 
    ScrollToTop 
} from '../../../Components';
import { 
    PlansSection, 
    PlansContainer, 
    PlansIntro, 
    PlansH1 , 
    PlansStyle, 
    PlansTableWrapper, 
    PlansCards, 
    PlansRow, 
    PlanCard, 
    PlanCardHeader, 
    PlanH4, 
    PlanP, 
    PlanPrice, 
    DollarSign, 
    PlanCardList, 
    PlanCardListItem, 
    PlanCardFooter, 
    Divider
} from './plansElements';

const Plans = () => {
    return (
        <>  
            <ScrollToTop/>
            <Header/>
            <PlansSection>
                <PlansContainer>
                    <PlansIntro>
                        <PlansH1>Popular Pricing Package</PlansH1>
                        <PlansStyle/>
                    </PlansIntro>
                    <PlansTableWrapper>
                        <PlansCards>
                            <PlansRow>
                                <PlanCard>
                                    <PlanCardHeader>
                                        <PlanH4>Normal</PlanH4>
                                        <PlanP>This is a placeholder</PlanP>
                                        <PlanPrice><DollarSign>R$</DollarSign>45.80</PlanPrice>
                                    </PlanCardHeader>
                                    <PlanCardList>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                    </PlanCardList>
                                    <PlanCardFooter>
                                        <Button primary={0} large={1}>Selecionar</Button>
                                    </PlanCardFooter>
                                </PlanCard>
                                <PlanCard>
                                    <PlanCardHeader>
                                        <PlanH4>Normal</PlanH4>
                                        <PlanP>This is a placeholder</PlanP>
                                        <PlanPrice><DollarSign>R$</DollarSign>45.80</PlanPrice>
                                    </PlanCardHeader>
                                    <PlanCardList>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                    </PlanCardList>
                                    <PlanCardFooter>
                                        <Button primary={0} large={1}>Selecionar</Button>
                                    </PlanCardFooter>
                                </PlanCard>
                                <PlanCard>
                                    <PlanCardHeader>
                                        <PlanH4>Normal</PlanH4>
                                        <PlanP>This is a placeholder</PlanP>
                                        <PlanPrice><DollarSign>R$</DollarSign>45.80</PlanPrice>
                                    </PlanCardHeader>
                                    <PlanCardList>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                        <PlanCardListItem>Lorem Ipsum</PlanCardListItem>
                                    </PlanCardList>
                                    <PlanCardFooter>
                                        <Button primary={0} large={1}>Selecionar</Button>
                                    </PlanCardFooter>
                                </PlanCard>
                            </PlansRow>
                        </PlansCards>
                    </PlansTableWrapper>
                </PlansContainer>
            </PlansSection>
            <Divider/>
            <Footer/>
        </>
    )
}

export default Plans;

