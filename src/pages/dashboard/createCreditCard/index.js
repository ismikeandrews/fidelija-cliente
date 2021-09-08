import React, { useState, useRef } from 'react';
import { useChain, useSpring, useTransition, animated, useSpringRef } from 'react-spring';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { Link } from 'react-router-dom';
import { useFormik, FormikProvider, Form } from 'formik';
import * as yup from 'yup';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { 
    Breadcrumbs, 
    Link as MuiLink,
    Typography,
    Paper,
    Checkbox,
    FormControlLabel,
    Grid,
    Backdrop,
    CircularProgress
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { userService } from '../../../services';
import { Snackbar } from '../../../components';
import { useStyles } from './CreditCardElements';
import Textfield from '../../../components/FormsUI/Textfield'
import MaskedTextField from '../../../components/FormsUI/MaskedTextField';
import Button from '../../../components/FormsUI/Button';
import Amex from '../../../assets/images/img/amex.png';
import Chip from '../../../assets/images/img/chip.png';
import Diners from '../../../assets/images/img/dinersclub.png';
import Discover from '../../../assets/images/img/discover.png';
import Jcb from '../../../assets/images/img/jcb.png';
import Mastercard from '../../../assets/images/img/mastercard.png';
import Troy from '../../../assets/images/img/troy.png';
import Unionpay from '../../../assets/images/img/unionpay.png';
import Visa from '../../../assets/images/img/visa.png';

const CreateCreditCard = () => {
    const [flipped, setFlipped] = useState(false);
    const [validThru, setValidThru] = useState(moment())
    const [main, setMain] = useState(false);
    const [flag, setFlag] = useState(Visa);
    const [isAmex, setIsAmex] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const [toggleSuccess, setToggleSuccess] = useState(false);
    const [toggleFailure, setToggleFailure] = useState(false);
    const [number, setNumber] = useState('#### #### #### ####');
    const [name, setName] = useState('FULL NAME')
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
    const numberTransition = useTransition(number, {
        from: {y: 20, opacity: 0},
        enter: {y: 0, opacity: 1},
        ref: numberTransitionRef
    });
    const nameTransition = useTransition(name, {
        from: {y: 20, opacity: 0},
        enter: {y: 0, opacity: 1},
        ref: nameTransitionRef
    });
    const validThruTransition = useTransition(validThru, {
        from: {y: 20, opacity: 0},
        enter: {y: 0, opacity: 1},
        ref: validThruTransitionRef
    });

    const formik = useFormik({
        initialValues: {
            number: '',
            name: '',
            cvv: '',
            description: '',
        },
        validationSchema: yup.object({
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
            submitCreditCard(values, onSubmitProps)
        },
    });

    useChain([springRef, flagTransitionRef, numberTransitionRef, nameTransitionRef, validThruTransitionRef])

    const submitCreditCard = async (values, onSubmitProps) => {
        setIsLoading(true)
        const data = {
            card: {
                description: values.description,
                name: values.name,
                number: values.number,
                validThru: moment(validThru).format('MM/YY'),
                cvv: values.cvv,
                main: main,
                remember: true
            }
        }
        try {
            await userService.setCreditCard(data);
            onSubmitProps.resetForm();
            setValidThru(moment());
            setMain(false);
            setIsLoading(false);
            setInfoMsg('Cartão cadastrado com sucesso.');
            setToggleSuccess(true);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setInfoMsg('Não foi possível cadastrar seu cartão, revise os dados e tente novamente.');
            setToggleFailure(true);
        }
    }

    const getCurrentFlag = (event) => {
        formik.handleChange(event)
        let number = event.target.value;
        setNumber(number.length > 0 ? number : '#### #### #### ####')
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

    const handleNameChange = (event) => {
        formik.handleChange(event);
        setName(event.target.value.length > 0 ? event.target.value : 'FULL NAME')
    }

    return (
        <div>
            <Snackbar toggleSnack={toggleSuccess || toggleFailure} time={toggleFailure ? 4500 : 3500}  color={toggleSuccess ? "success" : "warning"}>
                {infoMsg}
            </Snackbar>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={classes.header}>
                <div>
                    <Typography variant="h5">Novo cartão de crédito</Typography>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                        <MuiLink color="inherit" component={Link} to="/">
                            Home
                        </MuiLink>
                        <MuiLink color="inherit" component={Link} to="/dashboard/wallet">
                            Meus cartões
                        </MuiLink>
                        <MuiLink color="inherit" component={Link} to="#">
                            Novo cartão de crédito
                        </MuiLink>
                    </Breadcrumbs>
                </div>
            </div>
            <div>
                <Paper variant="outlined">
                    <div className={classes.contentSpacing}>
                        <Grid container justify="space-between" alignItems="center" spacing={5}>
                            <Grid item xs={12} md={12} lg={6} xl={8}>
                                <FormikProvider value={formik}>
                                    <Form>
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
                                                    value={main}
                                                    onChange={() => setMain(main === false ? true : false)}
                                                    checked={main}
                                                    label="Marcar como cartão pricipal"
                                                    labelPlacement="end"
                                                    control={<Checkbox color="primary" />}/>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button type="submit">Cadastrar</Button>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Form>
                                </FormikProvider>
                            </Grid>
                            <Grid item xs={12} md={8} lg={6} xl={4} >
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
                                                                    {number}
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
                                                                <Typography variant="body1" className={classes.value}>{ formik.values.name.toLocaleUpperCase() || "FULL NAME"}</Typography>
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
                </Paper>
            </div>
        </div>
    )
}

export default CreateCreditCard
