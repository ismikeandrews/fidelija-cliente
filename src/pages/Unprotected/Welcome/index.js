import React, { useState } from 'react';

import { 
    Menu, 
    Header, 
    HeroSection, 
    InfoSection, 
    ServiceSection, 
    homeObjOne, 
    homeObjTwo, 
    homeObjThree, 
    homeObjFour 
} from './components';
import { Footer } from '../../../Components';

export default function Welcome(){
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Menu isOpen={isOpen} toggle={toggle}/>
            <Header toggle={toggle}/>
            <HeroSection/>
            <InfoSection {...homeObjOne}/>
            <InfoSection {...homeObjTwo}/>
            <ServiceSection/>
            <InfoSection {...homeObjThree}/>
            <InfoSection {...homeObjFour}/>
            <Footer/>
        </>
    );
};