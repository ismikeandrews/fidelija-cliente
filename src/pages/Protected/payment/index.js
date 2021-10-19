import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useChain, useSpring, useTransition, animated, useSpringRef } from 'react-spring';
import { useFormik, FormikProvider, Form } from 'formik';
import * as yup from 'yup';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Skeleton from '@material-ui/lab/Skeleton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { 
    Typography,
    Grid,
    FormControlLabel,
    Checkbox,
    Box, 
    Breadcrumbs,
    Backdrop,
    CircularProgress,
    Button as MuiButton, 
    Container, 
    Paper,
    ListItemIcon,
    Radio,
    RadioGroup,
    FormControl,
    Stepper,
    Step,
    StepLabel,
    Card,
    CardMedia,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Divider,
    Link as MuiLink
} from '@material-ui/core';
import { Snackbar, MaskedTextField, FButton, Textfield } from '../../../Components';
import { useStyles } from './PaymentElements';
import { UserService } from '../../../Services';
import { Amex, Chip, Dinersclub, Discover, Jcb, Mastercard, Troy, Unionpay, Visa} from '../../../Assets'

function Payment(){
    const [flipped, setFlipped] = useState(false);
    const [isAmex, setIsAmex] = useState(false);
    const [flag, setFlag] = useState(Visa);
    const [cardId, setCardId] = useState('');
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
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [cardList, setCardList] = useState([]);
    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const classes = useStyles();
    const springRef = useSpringRef();
    const flagTransitionRef = useSpringRef();
    const numberTransitionRef = useSpringRef();
    const nameTransitionRef = useSpringRef();
    const validThruTransitionRef = useSpringRef();
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
        validationSchema: yup.object(cardId.length === 0 ? {
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
        } : {

        }),
        onSubmit: (values, onSubmitProps) => {
            handleSubmit(values, onSubmitProps)
        },
    });

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const res = await UserService.getCreditCards()
            setCardList(res.data)
            setIsLoading(false)
        } catch (error) {
            console.error(error);
            setIsLoading(false)
        }
    }

    const handleSubmit = async (values, onSubmitProps) => {
        setIsLoading(true);
        const data = isPix ? {
           pix: true,
           product: {
               id: 1
           }
        } : {
            card: {
                id: cardId,
                number: values.number,
                name: values.name,
                validThru: moment(validThru).format('MM/YY'),
                cvv: values.cvv,
                remember: remember,
                main: mainCard,
                description: values.description,
            },
            product: {
                id: 1
            }
        }
        try {
            const res = await UserService.checkout(data)
            console.log(res.data)
            if(isPix){
                setQrCode(res.data.pix.qrcode)
                setPixCode(res.data.pix.qrcode_text)
                setEmail(res.data.payer_email)
                setName(res.data.payer_name)
                setIsLoading(false)
            }else{
                setIsLoading(false)
                setInfoMsg("Pagamento autorizado");
                setToggleSuccessSnack(true);
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            setInfoMsg('Ocorreu um erro');
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
                        <Divider/>
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

    return (
        <div>
            <Snackbar toggleSnack={toggleSuccessSnack || toggleFailureSnack} time={toggleFailureSnack ? 4500 : 3500}  color={toggleSuccessSnack ? "success" : "warning"}>
                {infoMsg}
            </Snackbar>

            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div style={{marginBottom: '30px'}}>
                <Typography variant="h5">
                    Pagamento
                </Typography>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
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
                                {isPix && (
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
        </div>
    )
}

export default Payment;