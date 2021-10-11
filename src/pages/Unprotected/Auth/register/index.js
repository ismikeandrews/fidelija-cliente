import React, { useState, useRef } from 'react'
import { useFormik, FormikProvider, Form } from 'formik';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import { useTransition, animated } from 'react-spring';
import { FileDrop } from 'react-file-drop';
import fileSize from 'filesize';
import ClearIcon from '@material-ui/icons/Clear'
import {
    Grid,
    Button as MuiButton,
    Stepper,
    Paper,
    Container,
    Step,
    StepLabel,
    Typography,
    Tooltip,
    IconButton,
    Checkbox,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Backdrop,
    CircularProgress,
    DialogContentText
} from '@material-ui/core';
import { useStyles } from './RegisterElements';

import { FilesSvg } from '../../../../Assets';
import Textfield from '../../../../Components/FormsUI/Textfield';
import MaskedTextfield from '../../../../Components/FormsUI/MaskedTextField';
import Button from '../../../../Components/FormsUI/Button';
import { Snackbar, Footer, Header } from '../../../../Components';
import { AddressService, AuthService, UserService } from '../../../../Services';

const Register = () => {
    const [isNew, setIsNew] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [showInputs, setShowInputs] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [imgUrl, setImgUrl] = useState('');
    const [dimentionError, setDimentionError] = useState(false);
    const [sizeError, setSizeError] = useState(false);
    const [toggleSuccess, setToggleSuccess] = useState(false);
    const [toggleFailure, setToggleFailure] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openTerms, setOpenTerms] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [step1Error, setStep1Error] = useState(false);
    const [step2Error, setStep2Error] = useState(false);
    const [step3Error, setStep3Error] = useState(false);
    const [step4Error, setStep4Error] = useState(false);
    const classes = useStyles();
    const steps = ["Dados Pessoais", "Dados da empresa", "Dados de endereço", "Senha e termos de uso"];
    const inputFile = useRef(null);
    const formik = useFormik({
        initialValues: {
            cpf: '',
            email: '',
            name: '',
            cnpj: '',
            companyName: '',
            postalcode: '',
            address: '',
            neighborhood: '',
            city: '',
            state: '',
            number: '',
            addressLine: '',
            password: '',
            confirmPassword: '',
            isNew: isNew
        },
        validationSchema: yup.object({
            isNew: yup
            .boolean(),
            name: yup
            .string()
            .when('isNew', {
                is: true,
                then: yup
                .string()
                .required(),
            }),
            email: yup
            .string()
            .email()
            .when('isNew', {
                is: true,
                then: yup
                .string()
                .email()
                .required(),
            }),
            cpf: yup
            .string()
            .required("CPF é obrigatório"),
            cnpj: yup
            .string()
            .required("CNPJ é obrigatório"),
            companyName: yup
            .string()
            .required("Nome fantasia é obrigatório"),
            postalcode: yup
            .string()
            .required("CEP é obrigatório"),
            address: yup
            .string()
            .required("Logradouro é obrigatório"),
            neighborhood: yup
            .string()
            .required("Bairro é obrigatório"),
            city: yup
            .string()
            .required("Cidade é obrigatório"),
            state: yup
            .string()
            .required("Estado é obrigatório"),
            number: yup
            .string()
            .required("Número é obrigatório"),
            addressLine: yup
            .string(),
            password: yup
            .string()
            .min(8, 'Senha deve ter mais de 8 caracteres')
            .required("Senha é obrigatório"),
            confirmPassword: yup.string().when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: yup.string().oneOf(
                [yup.ref("password")],
                "Senha não confere com a confirmação."
                )
            })
        }),
        onSubmit: (values, onSubmitProps) => {
            console.log("teste")
            submitUser(values, onSubmitProps)
        },
        enableReinitialize: true
    });
    const transition = useTransition(showInputs, {
        from: {y: 200, opacity: 0},
        enter: {y: 0, opacity: 1},
        leave: {y: 200, opacity: 0},
    })
    const checkCpf = async (e) => {
        formik.handleChange(e)
        if(e.target.value.length === 14){
            try {
                const authRes = await AuthService.cpfVerifier(e.target.value);
                setShowInputs(authRes.data === 1 ? false : true);
                setIsNew(authRes.data === 1 ? false : true);
            } catch (error) {
                console.log(error)
                setInfoMsg("Usuário já possui estabelecimento cadastrado em seu CPF")
                setToggleFailure(true)
                setShowInputs(false)
            }
        }
    }
    const searchPostalCode = async (e) => {
        formik.handleChange(e)
        if(e.target.value.length === 9){
            try {
                const { data } = await AddressService.getAddress(e.target.value);
                if(data.erro){
                    setInfoMsg("Endereço não encotrado");
                    setToggleFailure(true);
                    formik.setFieldValue('address', '');
                    formik.setFieldValue('neighborhood', '');
                    formik.setFieldValue('city', '');
                    formik.setFieldValue('state', '');
                };
                formik.setFieldValue('address', data.logradouro);
                formik.setFieldValue('neighborhood', data.bairro);
                formik.setFieldValue('city', data.localidade);
                formik.setFieldValue('state', data.uf);
            } catch (error) {
                console.log(error);
                setInfoMsg("Ocorreu um erro ao se comunicar com o servidor, tente novamente mais tarde.")
                setToggleFailure(true)
            }
        }
    }
    const handleNewImage = file => {
        setUploadedFile(file);
        setImgUrl(URL.createObjectURL(file));
        setDimentionError(false);
        setSizeError(false);
        let reader = new FileReader()
        reader.onload = e => {
            let img = new Image;
            img.onload = () => {
                if(img.width != img.height){
                    setDimentionError(true)
                }
            }
            img.src = reader.result;
        }
        reader.readAsDataURL(file);
        if(file.size > 500000){
            setSizeError(true)
        }
    }
    const closeSnack = () => {
        setToggleSuccess(false);
        setToggleFailure(false);
    }
    const handleAccept = () => {
        setOpenTerms(false);
        setAcceptTerms(true)
    }
    const submitUser = async (values, onSubmitProps) => {
        if(uploadedFile === null){
            setInfoMsg("Logo da empresa é obrigatório");
            setToggleFailure(true);
        }
        
        if(dimentionError || sizeError){
            setInfoMsg("A imagem não tem o formato correto")
            setToggleFailure(true);
        }
        setIsLoading(true);

        let data = new FormData()
        data.append('name', values.name);
        data.append('email', values.email);
        data.append('cpf', values.cpf);
        data.append('address_neighborhood', values.neighborhood);
        data.append('password', values.password);
        data.append('stablishment_image', uploadedFile);
        data.append('stablishment_name', values.companyName);
        data.append('stablishment_cnpj', values.cnpj);
        data.append('address_street', values.address);
        data.append('address_street', values.address);
        data.append('address_zip', values.postalcode);
        data.append('address_state', values.state);
        data.append('address_city', values.city);
        data.append('address_number', values.number);
        data.append('address_complementation', values.addressLine);

        try {
            const res = await AuthService.setNewUser(data);
            console.log(res.data);
            setIsLoading(false);
            setOpenAlert(true);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setInfoMsg("Ocorreu um erro ao se comunicar com o servidor, tente novamente mais tarde.");
            setToggleFailure(true);
        }
    }
    const resendEmail = async () => {
        const data = {email: formik.values.email}
        try {
            await UserService.resendLink(data);
            setInfoMsg("Email de confirmação enviado");
            setToggleSuccess(true);
        } catch (error) {
            console.log(error)
            setInfoMsg("Ocorreu um erro ao enviar o email, tente novamente mais tarde");
            setToggleFailure(true)
        }
    }
    const handleBack = (step) => {
        setCurrentStep(step);
         if (currentStep === 0) {
            if(formik.errors.cpf || formik.errors.name || formik.errors.email){
                setStep1Error(true)
            }else{
                setStep1Error(false)
            }
        }
        if (currentStep === 1) {
            if (formik.errors.cnpj || formik.errors.companyName || dimentionError || sizeError) {
                setStep2Error(true)
            }
            else{
                setStep2Error(false)
            }
        }
        if (currentStep === 2) {
            if (formik.errors.postalcode || formik.errors.address || formik.errors.neighborhood || formik.errors.state || formik.errors.city || formik.errors.number || formik.errors.addressLine) {
                setStep3Error(true)
            }
            else{
                setStep3Error(false)
            }
        }
        if (currentStep === 3) {
            if (formik.errors.password || formik.errors.confirmPassword) {
                setStep4Error(true)
            }else{
                setStep4Error(false)
            }
        }
    }
    const handleNext = (step) => {
        setCurrentStep(step);
        if (currentStep === 0) {
            if(formik.errors.cpf || formik.errors.name || formik.errors.email){
                setStep1Error(true)
            }
            else{
                setStep1Error(false)
            }
        }
        if (currentStep === 1) {
            if (formik.errors.cnpj || formik.errors.companyName || dimentionError || sizeError) {
                setStep2Error(true)
            }else{
                setStep2Error(false)
            }
        }
        if (currentStep === 2) {
            if (formik.errors.postalcode || formik.errors.address || formik.errors.neighborhood || formik.errors.state || formik.errors.city || formik.errors.number || formik.errors.addressLine) {
                setStep3Error(true)
            }else{
                setStep3Error(false)
            }
        }
        if (currentStep === 3) {
            if (formik.errors.password || formik.errors.confirmPassword) {
                setStep4Error(true)
            }else{
                setStep4Error(false)
            }
        }
    }
    const currentStepContent = step => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                Digite seu CPF para consulta de cadastro.
                            </Typography> 
                        </Grid>
                        <Grid item xs={12}>
                            <MaskedTextfield mask="999.999.999-99" name="cpf" label="CPF" type="text" value={formik.values.cpf} onChange={e => checkCpf(e)}/>
                        </Grid>
                        <Grid item xs={6}>
                            {transition((style, item) => 
                                item && (
                                    <animated.div style={style} className="item"> 
                                        <Textfield name="name" label="Nome completo" type="text" value={formik.values.name} onChange={formik.handleChange}/>
                                    </animated.div>
                                )
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            {transition((style, item) => 
                                item && (
                                    <animated.div style={style} className="item">
                                        <Textfield name="email" label="Email" type="email" value={formik.values.email} onChange={formik.handleChange}/>
                                    </animated.div>
                                )
                            )}
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <MaskedTextfield mask="99.999.999/9999-99" name="cnpj" label="CNPJ" value={formik.values.cnpj} onChange={formik.handleChange}/>                            
                        </Grid>
                        <Grid item xs={6}>
                            <Textfield name="companyName" label="Nome fantasia" value={formik.values.companyName} onChange={formik.handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" className={classes.infoTitle}>
                                Logo da empresa
                            </Typography>
                            <Paper variant="outlined" className={classes.paperFiles} onClick={() => inputFile.current.click()}>
                                <FileDrop onFrameDrop={(e) => handleNewImage(e.dataTransfer.files[0])}>
                                    <div className={classes.files}>
                                        <img src={FilesSvg} width="100"/>
                                        <div>
                                            <Typography variant="subtitle1">
                                                Selecione a imagem
                                            </Typography>
                                            <Typography variant="overline">
                                                Arreste o arquivo direto do seu computador
                                            </Typography>
                                        </div>
                                    </div>
                                </FileDrop>
                            </Paper>
                            <input accept="image/*" hidden id="button-file" type="file" ref={inputFile} onChange={(e) => handleNewImage(e.target.files[0])}/>
                            {uploadedFile !== null && (
                                <Paper variant="outlined" className={[classes.contentSpacing, classes.paperImg]} style={{border: dimentionError || sizeError ? '1px solid #f44336' : ''}}>
                                    <Container>
                                        <div className={classes.previewFormat}>
                                            <div className={classes.previewFormat}>
                                                <img src={imgUrl} width="125" style={{border: '1px solid #f0f0f0'}}/>
                                                <div style={{marginLeft: '20px'}}>
                                                    <Typography variant="subtitle1">{uploadedFile.name}</Typography>
                                                    <Typography variant="subtitle1">{fileSize(uploadedFile.size)}</Typography>
                                                </div>
                                                <div style={{marginLeft: '20px'}}>
                                                    {dimentionError && (
                                                        <Typography variant="body1" style={{ color: '#f44336'}}>A imagem deve ser quadrada</Typography>
                                                    )}
                                                    {sizeError && (
                                                        <Typography variant="body1" style={{ color: '#f44336'}}>A imagem deve ser menor que 500kB</Typography>
                                                    )}
                                                </div>
                                            </div>
                                            <Tooltip title="Remover">
                                                <IconButton aria-label="delete" className={classes.margin} onClick={() => setUploadedFile(null)}>
                                                    <ClearIcon fontSize="default"/>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </Container>
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <InputMask maskChar="" mask="99999-999" value={formik.values.postalcode} onChange={(e) => searchPostalCode(e)}>
                                {props => (
                                    <Textfield name="postalcode" label="CEP"/>
                                )}
                            </InputMask>
                        </Grid>
                        <Grid item xs={6}>
                            <Textfield name="address" label="Logradouro" value={formik.values.address} onChange={formik.handleChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Textfield name="neighborhood" label="Bairro" value={formik.values.neighborhood} onChange={formik.handleChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Textfield name="city" label="Cidade" value={formik.values.city} onChange={formik.handleChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Textfield name="state" label="Estado" value={formik.values.state} onChange={formik.handleChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Textfield name="number" label="Numero" value={formik.values.number} onChange={formik.handleChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Textfield name="addressLine" label="Complemento" value={formik.values.addressLine} onChange={formik.handleChange}/>
                        </Grid>
                    </Grid>
                );
            case 3:
                return (
                    <Grid container spacing={3}  direction="column">
                        <Grid item xs={6}>
                            <Textfield name="password" type="password" label="Senha" value={formik.values.password} onChange={formik.handleChange}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Textfield name="confirmPassword" type="password" label="Confirmar senha" value={formik.values.confirmPassword} onChange={formik.handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                            control={<Checkbox color="secondary" name="saveCard" checked={acceptTerms} value={acceptTerms} onClick={() => setOpenTerms(true)}/>}
                            label="Ler termos de uso"/>
                        </Grid>
                    </Grid>
                );
        
            default:
                break;
        }
    }
    return (
        <div>
            <Snackbar toggleSnack={toggleSuccess || toggleFailure} time={toggleFailure ? 4500 : 3500} onClose={closeSnack}  color={toggleSuccess ? "success" : "warning"}>
                {infoMsg}
            </Snackbar>
            <Dialog onClose={() => setOpenTerms(false)} open={openTerms}>
                <DialogTitle onClose={() => setOpenTerms(false)}>
                    Termos de uso
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                        lacus vel augue laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                        scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <MuiButton autoFocus onClick={handleAccept} color="primary">
                        Concordar
                    </MuiButton>
                </DialogActions>
            </Dialog>

            <Dialog
            open={openAlert}
            onClose={() => setOpenAlert(false)}>
            <DialogTitle>Estabelecimento cadastradado</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enviamos um link de confirmação no seu email, verifique a caixa de spam e lixo eletrônico.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <MuiButton onClick={resendEmail} color="primary">
                    Reenviar o link 
                </MuiButton>
                <MuiButton onClick={() => setOpenAlert(false)} color="primary">
                    Continuar
                </MuiButton>
            </DialogActions>
        </Dialog>

            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Header/>
                <div className={classes.spacing}>
                    <Container>
                        <FormikProvider value={formik}>
                            <Form>
                                <Paper variant="outlined" className={classes.content}>
                                    <Stepper activeStep={currentStep} alternativeLabel>
                                        <Step>
                                            <StepLabel error={step1Error}>Dados Pessoais</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel error={step2Error}>Dados da empresa</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel error={step3Error}>Dados de endereço</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel error={step4Error}>Senha e termos de uso</StepLabel>
                                        </Step>
                                    </Stepper>
                                    <div className={classes.form}>
                                        {currentStepContent(currentStep)}
                                    </div>
                                    <div className={classes.buttons}>
                                        <MuiButton disabled={currentStep === 0} onClick={() => handleBack((prevActiveStep) => prevActiveStep - 1)} className={classes.backButton}>
                                            Voltar
                                        </MuiButton>
                                        {currentStep === steps.length - 1 ? (
                                            <Button fullWidth={false} type="submit" disabled={acceptTerms === false ? true : false}>
                                                Finalizar
                                            </Button>
                                        ) : (
                                            <MuiButton variant="contained" color="primary" onClick={() => handleNext((prevActiveStep) => prevActiveStep + 1)}>
                                                Próximo
                                            </MuiButton>
                                        )}
                                    </div>
                                </Paper>
                            </Form>
                        </FormikProvider>
                    </Container>
                </div>
            <Footer/>
        </div>
    )
}

export default Register;