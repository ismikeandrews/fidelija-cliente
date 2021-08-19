import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputMask from 'react-input-mask';
import { Box, Button, Container, Paper } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Card from '@material-ui/core/Card';
import CardMedia  from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import { authService, userService } from '../../../services'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      padding: '20px',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    main: {
        padding: '50px'
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    ul: {
        listStyle: 'none'
    },
    paper: {
        padding: '5px',
        cursor: 'pointer',
    }
}));

function Payment(){
    const classes = useStyles();
    
    const [cardId, setCardId] = useState('');
    const [cardName, setCardName] = useState('');
    const [validThru, setValidThru] = useState(moment());
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [remember, setRemember] = useState(false);
    const [mainCard, setMainCard] = useState(false)
    const [cardDescription, setCardDescription] = useState('');
    const [isPix, setIsPix] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [pixCode, setPixCode] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [cardList, setCardList] = useState([]);

    const steps = isPix ? ['Escolha a forma de pagamento', 'Resumo'] : ['Escolha a forma de pagamento', 'Dados de Cartão de credito', 'Resumo'];

    const getStepContent = stepIndex => {
        if (!isPix){
            switch (stepIndex) {
              case 0:
                return (
                    <Box>
                        <Typography variant="h5" style={{marginBottom: '20px'}}>
                            Selecione a forma de pagamento
                        </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup row name="method" value={isPix === false ? '0' : '1'} onChange={e => setIsPix(e.target.value === '0' ? false : true)}>
                                <FormControlLabel value='0' control={<Radio />} label="Cartão de credito" />
                                <FormControlLabel value='1' control={<Radio />} label="Pix"/>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                );
              case 1:
                return (
                    <Box>
                        <Typography variant="h5" style={{marginBottom: '20px'}}>
                            Dados do cartão
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                id="cardDescription"
                                label="Apelido do cartão"
                                fullWidth
                                autoComplete="cc-description"
                                variant="outlined"
                                value={cardDescription}
                                onChange={e => setCardDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                required
                                id="cardName"
                                helperText="Nome conforme impresso no cartão"
                                label="Nome"
                                fullWidth
                                autoComplete="cc-name"
                                variant="outlined"
                                value={cardName}
                                onChange={e => setCardName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputMask maskChar="" mask="9999 9999 9999 9999" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} >
                                    {(props) => (
                                        <TextField  variant="outlined" required id="cardNumber" label=" Numero do Cartão" fullWidth  autoComplete="cc-number"/>
                                    )}
                                </InputMask>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDatePicker
                                    disableToolbar
                                    variant="dialog"
                                    format="MM/YY"
                                    label="Validade"
                                    views={["year", "month"]}
                                    disablePast
                                    inputVariant="outlined"
                                    fullWidth
                                    value={validThru}
                                    onChange={date => setValidThru(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}/>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                required
                                id="cvv"
                                label="CVV"
                                helperText="Os numeros atrás do cartão"
                                fullWidth
                                autoComplete="cc-csc"
                                variant="outlined"
                                value={cvv}
                                onChange={e => setCvv(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                control={<Checkbox color="secondary" name="saveCard" checked={mainCard} value={mainCard} onChange={() => setMainCard(mainCard === false ? true : false)}/>}
                                label="Marcar como cartão principal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                control={<Checkbox color="secondary" name="saveCard" checked={remember} value={remember} onChange={() => setRemember(remember === false ? true : false)}/>}
                                label="Lembrar dados para a próxima compra"
                                />
                            </Grid>
                        </Grid>
                        <List className={classes.root}>
                            {cardList.map((card) => (
                                <>
                                    <ListItem key={card.id} role={undefined} dense divider>
                                        <ListItemIcon>
                                            <Radio
                                            checked={cardId === card.id}
                                            onChange={() => setCardId(card.id)}
                                            value={cardId}/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            {card.description}
                                        </ListItemText>
                                    </ListItem>
                                </>                                    
                            ))}
                        </List>
                    </Box>  
                );
              case 2:
                return (
                    <div>
                        <Box>
                            <Typography variant="h5">
                                Resumo
                            </Typography>
                            <List className={classes.root} aria-label="mailbox folders">
                                <ListItem>
                                    <ListItemText primary="Método de pagamento" secondary="Cartão de Crédito"/>
                                </ListItem>
                                <Divider />
                                <ListItem light>
                                    <ListItemText primary="Valor" secondary="R$ 49,90/mênsal"/>
                                </ListItem>
                            </List>
                        </Box>
                    </div>
                );
              default:
                return 'Unknown stepIndex';
            }
        }
        if(isPix){
            switch (stepIndex) {
              case 0:
                return (
                    <Box>
                        <Typography variant="h5" style={{marginBottom: '20px'}}>
                            Selecione a forma de pagamento
                        </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup row name="method" value={isPix === false ? '0' : '1'} onChange={e => setIsPix(e.target.value === '0' ? false : true)}>
                                <FormControlLabel value='0' control={<Radio />} label="Cartão de credito" />
                                <FormControlLabel value='1' control={<Radio />} label="Pix"/>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                );
              case 1:
                return (
                    <div>
                        <Box>
                            <Typography variant="h5">
                                Resumo
                            </Typography>
                            <List className={classes.root} aria-label="mailbox folders">
                                <ListItem>
                                    <ListItemText primary="Método de pagamento" secondary="Pix"/>
                                </ListItem>
                                <Divider />
                                <ListItem divider>
                                    <ListItemText primary="Valor" secondary="R$ 49,90"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Vencimento" secondary={moment().add(5, 'days').format('DD/MM/YYYY')}/>
                                </ListItem>
                            </List>
                        </Box>
                    </div>  
                );
              default:
                return 'Unknown stepIndex';
            }
        }
    }
    
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const res = await userService.getCreditCards()
            console.log(res)
            setCardList(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if(activeStep === steps.length - 1){
            handleSubmit()
        }
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSubmit = async () => {
        const data = isPix ? {
           pix: true,
           product: {
               id: 1
           }
        } : {
            card: {
                id: cardId,
                number: cardNumber,
                name: cardName,
                validThru: moment(validThru).format('MM/YY'),
                cvv: cvv,
                remember: remember,
                main: mainCard,
                description: cardDescription,
            },
            product: {
                id: 1
            }
        }
        
        try {
            const res = await userService.checkout(data)
            console.log(res.data)
            if(isPix){
                setQrCode(res.data.pix.qrcode)
                setPixCode(res.data.pix.qrcode_text)
                setEmail(res.data.payer_email)
                setName(res.data.payer_name)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <React.Fragment>
            <Paper elevation={3}>
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === steps.length ? (
                            <div className={classes.main}>
                                {isPix ? (
                                    <Box>
                                        <Typography variant="h5" style={{marginBottom: '20px'}}>
                                            Pix
                                        </Typography>
                                        <Grid container spacing={4}>
                                            <Grid item xs={8}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="subtitle1">Pix copia e cola</Typography>
                                                        <Paper variant="outlined" className={classes.paper} onClick={() => {navigator.clipboard.writeText(pixCode)}}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={1}>
                                                                    <FileCopyOutlinedIcon color="primary" className={classes.icon}/>
                                                                </Grid>
                                                                <Grid item xs={11}>
                                                                    {isLoading ? (
                                                                        <Skeleton variant="text"/>
                                                                    ) : (
                                                                        <Typography variant="overline" style={{fontSize: '11px'}}>
                                                                            {pixCode}
                                                                        </Typography>
                                                                    )}
                                                                </Grid>
                                                            </Grid>
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Container>
                                                            <Typography variant="body2">Entre no aplicativo do seu banco acesse a area pix, escolha entre a opção de ler o código QR ou copiar e colar o código.</Typography>
                                                            <List className={classes.root} aria-label="mailbox folders">
                                                                <ListItem light>
                                                                    <ListItemText primary="Nome" secondary={name}/>
                                                                </ListItem>
                                                                <Divider />
                                                                <ListItem>
                                                                    <ListItemText primary="Email" secondary={email}/>
                                                                </ListItem>
                                                            </List>
                                                        </Container>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant="subtitle1">QR code</Typography>
                                                <Card>
                                                    <CardContent>
                                                        {isLoading ? <Skeleton variant="rect" width={260} height={260} /> : <CardMedia style={{height: 260}} image={qrCode}/>}  
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Typography variant="h5" style={{marginBottom: '20px'}}>
                                            Cartão
                                        </Typography>
                                        
                                    </Box>
                                )}
                                <Button onClick={handleReset} color="primary">Continuar</Button>
                            </div>
                            ) : (
                            <div>
                                <div className={classes.main}>
                                    <div>
                                        {getStepContent(activeStep)}
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.backButton}>
                                        Voltar
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => handleNext()}>
                                        {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Paper>
        </React.Fragment>
    )
}

export default Payment;