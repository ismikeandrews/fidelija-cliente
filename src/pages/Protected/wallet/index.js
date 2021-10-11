import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { 
    Accordion, 
    AccordionDetails, 
    AccordionSummary, 
    AccordionActions,
    Button,
    Container,
    Backdrop,
    CircularProgress,
    Dialog,
    Divider,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    Snackbar,
    Typography,
    Breadcrumbs,
    Link as MuiLink
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { userService } from '../../../services';
import { useStyles } from './WalletElements';
import { VisaSvg, MastercardSvg, AmexSvg, DinersclubSvg, NothingSvg } from '../../../Assets';

const SnackType = props => {
    return (
        <Snackbar open={props.toggleSnack} autoHideDuration={props.time} onClose={props.onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={props.onClose} severity={props.color} variant="filled">
                {props.children}
            </Alert>
        </Snackbar>
    )
}

function Wallet(){
    const classes = useStyles();
    const [openAlert, setOpenAlert] = useState(false)
    const [cardList, setCardList] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [cardId, setCardId] = useState('');
    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            const res = await userService.getCreditCards();
            console.log(res.data)
            setCardList(res.data);
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }

    const handleCardDelete = async (id) => {
        setOpenAlert(false)
        setIsLoading(true);
        setExpanded(false);
        try {
            await userService.deleteCreditCard(id);
            await fetchData();
            setIsLoading(false);
            setInfoMsg('Cartão excluido com sucesso.');
            setToggleSuccessSnack(true);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setInfoMsg('Ocorreu um erro ao tentar excluir.');
            setToggleFailureSnack(true);
        }
    }


    const getFlag = (brand) => {
        switch (brand) {
            case 'Visa':
                return (
                    <img src={VisaSvg} className={classes.cardIcon}/>
                )
            case 'Master':
                return (
                    <img src={MastercardSvg} className={classes.cardIcon}/>
                )
            case 'Amex':
                return (
                    <img src={AmexSvg} className={classes.cardIcon}/>
                )
            case 'Diners':
                return (
                    <img src={DinersclubSvg} className={classes.cardIcon}/>
                )
                
            default:
                break;
        }
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleDeleteAlert = id => {
        setCardId(id);
        setOpenAlert(true)
    }


    return (
        <div>
            <SnackType toggleSnack={toggleSuccessSnack || toggleFailureSnack} time={3500}  color={toggleSuccessSnack ? "success" : "warning"}>
                {infoMsg}
            </SnackType>

            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Dialog
            open={openAlert}
            onClose={() => setOpenAlert(false)}>
                <DialogTitle>Excluir Cartão</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Tem certeza que deseja remover o cartão ?
                        </DialogContentText>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAlert(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => handleCardDelete(cardId)} color="secondary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>

            <div className={classes.header}>
                <div>
                    <Typography variant="h5">
                        Meus cartões
                    </Typography>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                        <MuiLink color="inherit" component={Link} to="/">
                            Home
                        </MuiLink>
                        <MuiLink color="inherit" component={Link} to="#">
                            Meus cartões
                        </MuiLink>
                    </Breadcrumbs>
                </div>
                {cardList.length > 0 && (
                    <div>
                        <Button variant="contained" color="primary" endIcon={<AddIcon/>} component={Link} to="/dashboard/create-cc">
                            Novo cartão
                        </Button>
                    </div>
                )}
            </div>

            {isLoading || (
                <Paper variant="outlined" className={classes.content}>
                    <Container className={classes.root}>
                        {cardList.length ? (
                            <div>
                                <Typography variant="h5" className={classes.spacing}>
                                    Meus Cartões
                                </Typography>
                                <div>
                                    <Grid container>
                                        {cardList.map((card, index) => (
                                            <Grid item xs={12}>
                                                <Accordion key={card.id} className={classes.accordion} expanded={expanded === index} onChange={handleChange(index)} className={classes.arccord}>
                                                    <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1c-content"
                                                    id="panel1c-header">
                                                    <div className={classes.column}>
                                                        {getFlag(card.data.brand)}
                                                    </div>
                                                    <div className={classes.column}>
                                                        <Typography className={classes.secondaryHeading}>{card.description}</Typography>
                                                    </div>
                                                    </AccordionSummary>
                                                    <AccordionDetails className={classes.details}>
                                                    <div className={classes.column}>
                                                        <Typography variant="overline">
                                                            Numero:
                                                            <br/>
                                                            {card.data.display_number}
                                                        </Typography>
                                                    </div>
                                                    <div className={classes.column}>
                                                        <Typography variant="overline">
                                                            Validade : 
                                                            <br/>
                                                            {card.data.month}/{card.data.year}
                                                        </Typography>
                                                    </div>
                                                    <div className={clsx(classes.column, classes.helper)}>
                                                        <Typography variant="overline">
                                                            Nome :
                                                        <br />
                                                        {card.data.holder_name}
                                                        </Typography>
                                                    </div>
                                                    </AccordionDetails>
                                                    <Divider />
                                                    <AccordionActions>
                                                        <Button color="secondary" onClick={() => handleDeleteAlert(card.id)}>
                                                            Excluir
                                                        </Button>
                                                    </AccordionActions>
                                                </Accordion>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </div>
                        ) : (
                            <div className={classes.notRegistered}>
                                <img src={NothingSvg} width="250"/>
                                <Typography variant="h6" className={classes.infoText}>
                                    Você não tem nem um cartão cadastrado.
                                </Typography>
                                <Button  variant="contained" color="primary" endIcon={<AddIcon/>} component={Link} to="/dashboard/create-cc">
                                    Novo cartão
                                </Button>
                            </div>
                        )}
                    </Container>
                </Paper>
            )}
        </div>
    )
}
export default Wallet;