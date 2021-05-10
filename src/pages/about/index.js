import React from 'react';
import Button from '@material-ui/core/Button';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


import { Footer, Header, Button as PButton } from '../../components';
import Collab from '../../assets/images/svg/collab.svg';
import { MainSection, LeftSection, Title, Msg, RightSection, RightSectionImg } from './aboutElements';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const About = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Header/>
                <MainSection>
                    <LeftSection>
                        <Title>Placeholder Here</Title>
                        <Msg>Lorem ipsum dolor sit amet consectetut adi[psocomg e;it. Ex nigil rerum itaque quisqua,! Matis re[odiamdae mescoimt tempora pdop a,et. Saepe?</Msg>
                        <PButton primary={true} icon={<PlayArrowRoundedIcon style={{ fontSize: 25 }}/>} onClick={handleClickOpen}>Assita ao video</PButton>
                    </LeftSection>
                    <RightSection>
                        <RightSectionImg src={Collab} alt="collaboration"/>
                    </RightSection>
                </MainSection>
            <Footer/>
            <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-slide-title">Video</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/rTZ30NCqxwI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default About;
