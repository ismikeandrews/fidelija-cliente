import React from 'react';

import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { Footer, Header, Button } from '../../components';
import Collab from '../../assets/images/svg/collab.svg';
import { MainSection, LeftSection, Title, Msg, RightSection, RightSectionImg } from './aboutElements';

const About = () => {
    return (
        <>
            <Header/>
                <MainSection>
                    <LeftSection>
                        <Title>Placeholder Here</Title>
                        <Msg>Lorem ipsum dolor sit amet consectetut adi[psocomg e;it. Ex nigil rerum itaque quisqua,! Matis re[odiamdae mescoimt tempora pdop a,et. Saepe?</Msg>
                        <Button primary={true} icon={<PlayArrowRoundedIcon style={{ fontSize: 25 }}/>}>Assita ao video</Button>
                    </LeftSection>
                    <RightSection>
                        <RightSectionImg src={Collab} alt="collaboration"/>
                    </RightSection>
                </MainSection>
            <Footer/>
        </>
    );
};

export default About;
