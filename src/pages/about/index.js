import React from 'react';

import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { Footer, Header, Button } from '../../components';
import Collab from '../../assets/images/svg/collab.svg';
import { MainSection } from './aboutElements';

const About = () => {
    return (
        <>
            <Header/>
                <h1>About</h1> 
                <MainSection>
                    <h2 className="title">A Placeholder Goes Here</h2>
                    <p>Lorem ipsum dolor sit amet consectetut adi[psocomg e;it. Ex nigil rerum itaque quisqua,! Matis re[odiamdae mescoimt tempora pdop a,et. Saepe?</p>
                    <Button primary={true} icon={<PlayArrowRoundedIcon style={{ fontSize: 25 }}/>}>Assita ao video</Button>
                </MainSection>
                <section className="right">
                    <img src={Collab} alt="collaboration"/>
                </section>
            <Footer/>
        </>
    );
};

export default About;
