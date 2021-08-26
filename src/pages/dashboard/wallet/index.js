import React, { useState, useEffect } from 'react';

import InputMask from 'react-input-mask';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { 
    Accordion, 
    AccordionDetails, 
    AccordionSummary, 
    AccordionActions,
    Button,
    Checkbox,
    Container,
    CircularProgress,
    Dialog,
    Divider,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    Grid,
    Modal,
    Paper,
    Snackbar,
    Typography,
    TextField
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { userService } from '../../../services';

import visa from '../../../assets/images/svg/visa.svg';
import mastercard from '../../../assets/images/svg/mastercard.svg';
import amex from '../../../assets/images/svg/amex.svg';
import diners from '../../../assets/images/svg/diners.svg'
import moment from 'moment';

const SnackType = props => {
    return (
        <Snackbar open={props.toggleSnack} autoHideDuration={props.time} onClose={props.onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={props.onClose} severity={props.color} variant="filled">
                {props.children}
            </Alert>
        </Snackbar>
    )
}

const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    spacing: {
        marginBottom: '15px'
    },
    cardIcon: {
        width: '50px'
    },
    arccord: {
        width: '100%',
    },
    addButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '25px',
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    notRegistered: {
        textAlign: 'center',
        padding: '90px',
    },
    infoText: {
        marginBottom: '20px'
    },
    content: {
        paddingTop: '30px',
        paddingBottom: '50px'
    }
}));

function Wallet(){
    const classes = useStyles();
    const [openForm, setOpenForm] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [validThru, setValidThru] = useState(moment());
    const [cvv, setCvv] = useState('');
    const [main, setMain] = useState(false);
    const [description, setDescription] = useState('');
    const [cardList, setCardList] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [cardId, setCardId] = useState('');
    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [successMsg, setSuccessMsg] = useState('Operação realizada com sucesso');

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
            console.log(error)
            setIsLoading(false)
        }
    }

    const handleCardDelete = async (id) => {
        setOpenAlert(false)
        setIsLoading(true);
        setExpanded(false)
        try {
            await userService.deleteCreditCard(id)
            await fetchData()
            setIsLoading(false)
            setSuccessMsg('Cartão excluido com sucesso')
            setToggleSuccessSnack(true)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setToggleFailureSnack(true)
        }
    }

    const setNewCreditCard = async () => {
        setIsLoading(true)
        const data = {
            card: {
                description,
                name,
                number,
                validThru: moment(validThru).format('MM/YY'),
                cvv,
                main,
                remember: true
            }
        }

        try {
            await userService.setCreditCard(data)
            fetchData()
            setOpenForm(false)
            setIsLoading(false)
            setDescription('')
            setName('')
            setNumber('')
            setValidThru(moment());
            setCvv('');
            setMain(false);
            setSuccessMsg('Cartão cadastrado com sucesso');
            setToggleSuccessSnack(true)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setToggleFailureSnack(true)
        }
    }

    const getFlag = (brand) => {
        switch (brand) {
            case 'Visa':
                return (
                    <img src={visa} className={classes.cardIcon}/>
                )
            case 'Master':
                return (
                    <img src={mastercard} className={classes.cardIcon}/>
                )
            case 'Amex':
                return (
                    <img src={amex} className={classes.cardIcon}/>
                )
            case 'Diners':
                return (
                    <img src={diners} className={classes.cardIcon}/>
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

    const closeSnack = () => {
        setToggleSuccessSnack(false);
        setToggleFailureSnack(false);
    }

    return (
        <div>
            <SnackType toggleSnack={toggleSuccessSnack} time={3500} onClose={() => closeSnack()} color="success">
                {successMsg}
            </SnackType>

            <SnackType toggleSnack={toggleFailureSnack} time={4000} onClose={() => closeSnack()} color="warning">
                Ocorreu um erro durante a conexão, tente novamente mais tarde
            </SnackType>

            {cardList.length > 0 && (
                <div className={classes.addButton}>
                    <Button  variant="contained" color="primary" onClick={() => setOpenForm(true)} endIcon={<AddIcon/>}>
                        Novo cartão
                    </Button>
                </div>
            )}

            <Dialog open={openForm} onClose={() => setOpenForm(false)} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="md">
                <DialogTitle id="form-dialog-title">Dados cadastrais</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Insira os dados de cartão de crédito para futuras compras na plataforma.
                    </DialogContentText>
                    <TextField 
                        autoFocus 
                        margin="dense" 
                        id="description" 
                        label="Descrição" 
                        type="text" 
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                        fullWidth/>
                    <TextField 
                        margin="dense" 
                        helperText="Nome conforme impresso no cartão"
                        id="name" 
                        label="Nome" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text"
                        fullWidth/>
                    <InputMask maskChar="" mask="9999 9999 9999 9999" value={number}  onChange={e => setNumber(e.target.value)}>
                        {(props) => (
                            <TextField margin="dense" id="number" label="Numero do cartão" type="text" fullWidth/>
                        )}
                    </InputMask>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                        disableToolbar
                        variant="dialog"
                        format="MM/YY"
                        margin="normal"
                        label="Validade"
                        views={["year", "month"]}
                        disablePast
                        value={validThru}
                        onChange={date => setValidThru(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}/>
                    </MuiPickersUtilsProvider>
                    <br/>
                    <TextField margin="dense" id="cvv" helperText="Nome conforme impresso no cartão" label="CVV" type="text" value={cvv} onChange={e => setCvv(e.target.value)}/>
                    <br/>
                    <FormControlLabel
                    control={<Checkbox color="secondary" name="main" checked={main} value={main} onChange={() => setMain(main === false ? true : false)}/>}
                    label="Marcar como cartão principal"/>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setOpenForm(false)} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={() => setNewCreditCard()} color="primary">
                    Salvar
                </Button>
                </DialogActions>
            </Dialog>

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

            {isLoading ? (
                <Modal className={classes.center} disableEnforceFocus disableAutoFocus open>
                    <CircularProgress color="primary" />
                </Modal>
            ) : (
                <>
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
                                    <Typography variant="h6" className={classes.infoText}>
                                        Você não tem nem um cartão cadastrado.
                                    </Typography>
                                    <Button  variant="contained" color="primary" onClick={() => setOpenForm(true)} endIcon={<AddIcon/>}>
                                        Novo cartão
                                    </Button>
                                </div>
                            )}
                        </Container>
                    </Paper>
                </>
            )}
        </div>
    )
}
export default Wallet;