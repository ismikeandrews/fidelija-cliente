import React, { useState, useEffect } from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
import { useChain, useSpring, useTransition, animated, useSpringRef } from 'react-spring';
import { useFormik, FormikProvider, Form } from 'formik';
import * as yup from 'yup';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Skeleton from '@material-ui/lab/Skeleton';
import { FileCopyOutlined, NavigateNext, Add } from '@material-ui/icons';
import { Button, Typography, Grid, FormControlLabel, Checkbox, Box, Breadcrumbs, Button as MuiButton, Container, Paper, Radio, RadioGroup, FormControl, Stepper, Step, StepLabel, Card, CardMedia, CardContent, List, ListItem, ListItemText, Divider, Link as MuiLink, Tab, Tabs } from '@material-ui/core';
import { Snackbar, MaskedTextField, FButton, Textfield, Backdrop } from '../../../Components';
import { Amex, Chip, Discover, FillSvg, Mastercard, Troy, Visa} from '../../../Assets'
import { UserService, AuthService } from '../../../Services';
import { Styles } from './payment.elements';

function Payment(){
    const [flipped, setFlipped] = useState(false);
    const [isAmex, setIsAmex] = useState(false);
    const [flag, setFlag] = useState(Visa);
    const [cardId, setCardId] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [cardName, setCardName] = useState('FULL NAME');
    const [validThru, setValidThru] = useState(moment());
    const [cardNumber, setCardNumber] = useState('#### #### #### ####');
    const [remember, setRemember] = useState(false);
    const [mainCard, setMainCard] = useState(false)
    const [isPix, setIsPix] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [pixCode, setPixCode] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [cardList, setCardList] = useState([]);
    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const [haveAddress, setHaveAddress] = useState(false);
    const classes = Styles();
    const springRef = useSpringRef();
    const flagTransitionRef = useSpringRef();
    const numberTransitionRef = useSpringRef();
    const nameTransitionRef = useSpringRef();
    const validThruTransitionRef = useSpringRef();
    const { productId } = useParams();
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
        ref: springRef
    });
    const flagTransition = useTransition(flag, {
        from: {y: 40, opacity: 0},
        enter: {y: 0, opacity: 1},
        ref: flagTransitionRef
    });
    const numberTransition = useTransition(cardNumber, {
        from: {y: 20, opacity: 0},
        enter: {y: 0, opacity: 1},
        ref: numberTransitionRef
    });
    const nameTransition = useTransition(cardName, {
        from: {y: 20, opacity: 0},
        enter: {y: 0, opacity: 1},
        ref: nameTransitionRef
    });
    const validThruTransition = useTransition(validThru, {
        from: {y: 20, opacity: 0},
        enter: {y: 0, opacity: 1},
        ref: validThruTransitionRef
    });
    useChain([springRef, flagTransitionRef, numberTransitionRef, nameTransitionRef, validThruTransitionRef]);

    const steps = isPix ? ['Escolha a forma de pagamento', 'Resumo'] : ['Escolha a forma de pagamento', 'Dados de Cartão de credito', 'Resumo'];

    const formik = useFormik(isPix || {
        initialValues: {
            number: '',
            name: '',
            cvv: '',
            description: '',
        },
        validationSchema: yup.object(cardId.length === 0 && {
            number: yup
            .number()
            .typeError('Campo numérico')
            .required('Número é obrigatório'),
            name: yup
            .string('O nome deve conter apenas letras')
            .required('Nome é obrigatório'),
            description: yup
            .string('O apelido deve conter apenas letras'),
            cvv: yup
            .number()
            .typeError('Campo numérico')
            .required('CVV é obrigatório'),
        }),
        onSubmit: (values, onSubmitProps) => {
            handleSubmit(values, onSubmitProps)
        },
    });

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const addressChecked = AuthService.checkUserAddress()
        setHaveAddress(addressChecked);
        if (addressChecked) {
            try {
                const res = await UserService.getCreditCards()
                setCardList(res.data)
                setIsLoading(false)
            } catch (error) {
                console.error(error);
                setIsLoading(false)
            }
        }
        setIsLoading(false)
    }

    const handleSubmit = async (values, onSubmitProps) => {
        setIsLoading(true);
        try {
            const invoiceRes = await UserService.newInvoice({plain: productId});
            console.log(invoiceRes)
            if(isPix){
                setQrCode(invoiceRes.data.pix.qrcode)
                setPixCode(invoiceRes.data.pix.qrcode_text)
                setIsLoading(false)
            } else {
                const data = {
                    invoice: invoiceRes.data.id,
                    method: 'card',
                    pix: false,
                    card: {
                        id: cardId,
                        number: values.number,
                        name: values.name,
                        validThru: moment(validThru).format('MM/YY'),
                        cvv: values.cvv,
                        remember: remember,
                        main: mainCard,
                        description: values.description,
                    }
                }
                const res = await UserService.checkout(data)
                console.log(res)
                setIsLoading(false)
                setInfoMsg("Pagamento autorizado");
                setToggleSuccessSnack(true);
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            setInfoMsg('Pagamento não autorizado');
            setToggleFailureSnack(true)
        }
    }

    const handleNameChange = (event) => {
        formik.handleChange(event);
        setCardName(event.target.value.length > 0 ? event.target.value : 'FULL NAME')
    }

    const getCurrentFlag = (event) => {
        formik.handleChange(event)
        let number = event.target.value;
        setCardNumber(number.length > 0 ? number : '#### #### #### ####')
        let re = new RegExp("^4");
        if (number.match(re) != null) {
            setFlag(Visa); 
            setIsAmex(false);
        }

        re = new RegExp("^(34|37)");
        if (number.match(re) != null) {
            setIsAmex(true);
            setFlag(Amex); 
        }

        re = new RegExp("^5[1-5]");
        if (number.match(re) != null) {
            setFlag(Mastercard); 
            setIsAmex(false);
        }

        re = new RegExp("^6011");
        if (number.match(re) != null) {
            setFlag(Discover); 
            setIsAmex(false);
        }
        
        re = new RegExp('^9792')
        if (number.match(re) != null) {
            setFlag(Troy); 
            setIsAmex(false);
        }
        if(number.length === 0){
            setFlag(Visa)
            setIsAmex(false)
        }
    }

    const getStepContent = stepIndex => {
        if (!isPix){
            switch (stepIndex) {
              case 0:
                return (
                    <Box>
                        <div className={classes.contentSpacing}>
                            <Typography variant="h5" style={{marginBottom: '20px'}}>
                                Selecione a forma de pagamento
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup row name="method" value={isPix === false ? '0' : '1'} onChange={e => setIsPix(e.target.value === '0' ? false : true)}>
                                    <FormControlLabel value='0' control={<Radio />} label="Cartão de credito" />
                                    <FormControlLabel value='1' control={<Radio />} label="Pix"/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </Box>
                );
              case 1:
                return (
                    <Box>
                        <div className={classes.contentSpacing}>
                            <div style={{marginBottom: "30px"}}>
                                <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)}>
                                    <Tab label="Novo Cartão"/>
                                    <Tab label="Meus Cartões"/>
                                </Tabs>
                                <Divider/>
                            </div>
                            <div role="tabpanel" hidden={tabValue !== 0} id={`full-width-tabpanel-${0}`}>
                                {tabValue === 0 && (
                                    <div>
                                        <Typography variant="h5" style={{marginBottom: '20px'}}>
                                            Dados do cartão
                                        </Typography>
                                        <Grid container justify="space-between" alignItems="center" spacing={5}>
                                            <Grid item xs={12} md={12} lg={6} xl={8}>
                                                <div>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <MaskedTextField name="number" label="Número do cartão" margin="normal" mask={isAmex ? "9999 999999 99999" : "9999 9999 9999 9999"} value={formik.values.number} onChange={(e) => getCurrentFlag(e)}/>     
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Textfield
                                                            name="description" 
                                                            label="Apelido" 
                                                            margin="normal" 
                                                            helperText="ex. Cartão corporativo"
                                                            value={formik.values.description} 
                                                            onChange={formik.handleChange}/>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Textfield
                                                            required
                                                            name="name" 
                                                            label="Nome"
                                                            margin="normal"
                                                            helperText="Nome igual no cartão"
                                                            value={formik.values.name} 
                                                            onChange={e => handleNameChange(e)}/>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                                                <KeyboardDatePicker
                                                                disableToolbar
                                                                fullWidth
                                                                required
                                                                inputVariant="outlined"
                                                                variant="dialog"
                                                                format="MM/YY"
                                                                margin="normal"
                                                                label="Validade"
                                                                views={["year", "month"]}
                                                                disablePast
                                                                value={validThru}
                                                                onChange={date => setValidThru(date)}/>
                                                            </MuiPickersUtilsProvider>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <MaskedTextField mask={isAmex ? "9999" : "999"} value={formik.values.cvv} onChange={formik.handleChange} onFocus={() => setFlipped(true)} onBlur={() => setFlipped(false)} name="cvv" label="CVV" margin="normal"/>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <FormControlLabel
                                                            value={mainCard}
                                                            onChange={() => setMainCard(mainCard === false ? true : false)}
                                                            checked={mainCard}
                                                            label="Marcar como cartão pricipal"
                                                            labelPlacement="end"
                                                            control={<Checkbox color="primary" />}/>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <FormControlLabel
                                                            value={remember}
                                                            onChange={() => setRemember(remember === false ? true : false)}
                                                            checked={remember}
                                                            label="Lembrar dados para próxima compra"
                                                            labelPlacement="end"
                                                            control={<Checkbox color="primary" />}/>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={8} lg={6} xl={4} className={classes.gridLimit}>
                                                <div className={classes.container}>
                                                    <animated.div style={{ opacity: opacity.to((o) => 1 - o), transform }} className={classes.creditCard}>
                                                        <div className={classes.ccContainer}>
                                                            <Grid container spacing={4}>
                                                                <Grid item xs={6}>
                                                                    <img src={Chip} width="60px"/>
                                                                </Grid>
                                                                <Grid item xs={6} className={classes.ccFlag}>
                                                                    {flagTransition((style, item) => 
                                                                        item && (
                                                                            <animated.div style={style} className="item">
                                                                                <img src={flag} width={flag === Mastercard ? 80 : 100}/>
                                                                            </animated.div>
                                                                        )
                                                                    )}
                                                                </Grid>
                                                                <Grid item xs={12} xl={12}>
                                                                    {numberTransition((style, item) => 
                                                                        item && (
                                                                            <animated.div style={style} className="item">
                                                                                <Typography variant="body1" className={classes.ccNumber}>
                                                                                    {cardNumber}
                                                                                </Typography>
                                                                            </animated.div>
                                                                        )
                                                                    )}
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Typography variant="overline" className={classes.titles}>Card Holder</Typography>
                                                                    {nameTransition((style, item) => 
                                                                        item && (
                                                                            <animated.div style={style} className="item">
                                                                                <Typography variant="body1" className={classes.value}>{cardName.toLocaleUpperCase()}</Typography>
                                                                            </animated.div>
                                                                        )
                                                                    )}
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Typography variant="overline" className={classes.titles}>Valid Thru</Typography>
                                                                    {validThruTransition((style, item) => 
                                                                        item && (
                                                                            <animated.div style={style} className="item">
                                                                                <Typography variant="body1" className={classes.value}>{moment(validThru).format("MM/YY")}</Typography>
                                                                            </animated.div>
                                                                        )
                                                                    )}
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    </animated.div>
                                                    <animated.div style={{opacity, transform, rotateY: "180deg"}} className={classes.creditCard}>
                                                        <div className={classes.band}></div>
                                                        <div className={classes.cvv}>
                                                            <Typography variant="subtitle1" className={classes.cvvTitle}>CVV</Typography>
                                                            <div className={classes.cvvBand}>
                                                                <Typography variant="body1">{formik.values.cvv ? formik.values.cvv : isAmex ? "****" : "***"}</Typography>
                                                            </div>
                                                            <div className={classes.flagContainer}>
                                                                <img src={flag} className={classes.flag}/>
                                                            </div>
                                                        </div>
                                                    </animated.div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>       
                                )}
                            </div>
                            <div role="tabpanel" hidden={tabValue !== 1} id={`full-width-tabpanel-${1}`}>
                                {tabValue === 1 && (
                                    <div>
                                        <Container maxWidth="xl">
                                            <Typography variant="h5" style={{marginBottom: '20px'}}>
                                                Meus cartões
                                            </Typography>
                                            <List>
                                                {cardList.map((card) => (
                                                    <Paper variant="outlined" className={classes.cardsPaper} key={card.id} onClick={() => setCardId(card.id)}>
                                                        <Grid container spacing={3} alignItems="center">
                                                            <Grid item>
                                                                <Radio
                                                                checked={cardId === card.id}
                                                                onChange={() => setCardId(card.id)}
                                                                value={cardId}/>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography variant="overline">{card.description}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>                                   
                                                ))}
                                            </List>
                                        </Container>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Box>  
                );
              case 2:
                return (
                    <div className={classes.contentSpacing}>
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
                                    <ListItemText primary="Valor" secondary={productId === '1' ? "R$ 49,90/mênsal" : "R$ 500,00/anual"}/>
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
                        <div className={classes.contentSpacing}>
                            <Typography variant="h5" style={{marginBottom: '20px'}}>
                                Selecione a forma de pagamento
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup row name="method" value={isPix === false ? '0' : '1'} onChange={e => setIsPix(e.target.value === '0' ? false : true)}>
                                    <FormControlLabel value='0' control={<Radio />} label="Cartão de credito" />
                                    <FormControlLabel value='1' control={<Radio />} label="Pix"/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </Box>
                );
              case 1:
                return (
                    <div className={classes.contentSpacing}>
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
                                    <ListItemText primary="Valor" secondary={productId === '1' ? "R$ 49,90/mênsal" : "R$ 500,00/mênsal"}/>
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

    if (productId !== '1' && productId !== '2') {
        return <Redirect to="/dashboard/subscription"/>
    }

    return (
        <div>
            <Snackbar toggleSnack={toggleSuccessSnack || toggleFailureSnack} time={toggleFailureSnack ? 4500 : 3500}  color={toggleSuccessSnack ? "success" : "warning"}>
                {infoMsg}
            </Snackbar>

            <Backdrop open={isLoading}/>
            <div style={{marginBottom: '30px'}}>
                <Typography variant="h5">
                    Pagamento
                </Typography>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                    <MuiLink color="inherit" component={Link} to="/">
                        Home
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="/dashboard/subscription">
                        Minha assinatura
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="#">
                        Pagamento
                    </MuiLink>
                </Breadcrumbs>
            </div>
            {haveAddress ? (
                <Paper elevation={3} variant="outlined">
                    <div className={classes.root}>
                        <Stepper activeStep={activeStep} alternativeLabel style={{marginBottom: "25px"}}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            {activeStep === steps.length ? (
                                <div className={classes.main}>
                                    {isPix && (
                                        <div>

                                            <Grid container spacing={3} className={classes.pixResume}>
                                                <Grid item>
                                                    <div>
                                                        <Typography variant="h5" style={{marginBottom: '20px'}}>
                                                            Pix
                                                        </Typography>
                                                        <div>
                                                            <Typography variant="subtitle1">Pix copia e cola</Typography>
                                                            <Paper variant="outlined" className={classes.paper} onClick={() => {navigator.clipboard.writeText(pixCode)}}>
                                                                <Grid container justifyContent="space-around" alignItems="center">
                                                                    <Grid item xs={1}>
                                                                        <FileCopyOutlined color="primary" className={classes.icon}/>
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
                                                        </div>
                                                        <Container className={classes.instructions}>
                                                            <Typography variant="body1">Entre no aplicativo do seu banco acesse a area pix, escolha entre a opção de ler o código QR ou copiar e colar o código.</Typography>
                                                            <Typography variant="body2">Pagamentos através do pix pode demorar até 30 minutos para ser verificado.</Typography>
                                                        </Container>
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1">QR code</Typography>
                                                    <Card>
                                                        <CardContent>
                                                            {isLoading ? <Skeleton variant="rect" width={260} height={260} /> : <CardMedia style={{height: 260, width: 260}} image={qrCode}/>}  
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            </Grid>
                                            <div className={classes.pixButton}>
                                                <MuiButton color="primary" variant="contained" onClick={() => console.log("tratamento")}>Concluir</MuiButton>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                ) : (
                                <div>
                                    <FormikProvider value={formik}>
                                        <Form>
                                            <div className={classes.main}>
                                                <div>
                                                    {getStepContent(activeStep)}
                                                </div>
                                            </div>
                                            <div>
                                                <MuiButton
                                                    disabled={activeStep === 0}
                                                    onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
                                                    className={classes.backButton}>
                                                    Voltar
                                                </MuiButton>
                                                {activeStep === steps.length - 1 ? (
                                                    isPix ? (
                                                        <MuiButton variant="contained" color="primary" onClick={() => {setActiveStep((prevActiveStep) => prevActiveStep + 1); handleSubmit()}}>
                                                            Finalizar
                                                        </MuiButton>
                                                    ) : (
                                                        <FButton variant="containerd" color="primary" type="submit">
                                                            Finalizar
                                                        </FButton>
                                                    )
                                                ) : (
                                                    <MuiButton variant="contained" color="primary" onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}>
                                                        Próximo
                                                    </MuiButton>
                                                )}
                                            </div>
                                        </Form>
                                    </FormikProvider>                                        
                                </div>
                            )}
                        </div>
                    </div>
                </Paper>
            ) : (
                <Paper variant="outlined">
                   <div className={classes.noAddress}>
                        <Container>
                            <img src={FillSvg} width="250"/>
                            <Typography variant="h6" className={classes.noAddressMg}>
                                Cadastre seu endereço para continuar
                            </Typography>
                            <Button variant="contained" color="primary" endIcon={<Add/>} component={Link} to="/dashboard/edit-address/0">
                                cadastrar
                            </Button>
                        </Container>
                    </div>
                </Paper>
            )}
        </div>
    )
}

export default Payment;