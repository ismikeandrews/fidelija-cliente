import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useFormik, FormikProvider, Form } from 'formik';
import * as yup from 'yup';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Cropper from 'react-easy-crop'
import { 
    Avatar,
    Typography,
    Breadcrumbs,
    Link as MuiLink,
    Tabs,
    Tab,
    Divider,
    Paper,
    Grid,
    Button as MuiButton,
    Checkbox,
    FormControlLabel,
    IconButton,
    Tooltip,
    Backdrop,
    CircularProgress,
    Dialog,
    DialogContent,
    Slider,
    DialogActions,
    DialogTitle,
    Card,
    CardContent,
    CardActionArea,
    CardActions
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useStyles } from './ProfileElements';
import { AuthService, UserService } from '../../../Services';
import { Snackbar, Button, Textfield, FButton, UseTerms, ImageCropper } from '../../../Components';
import { ProductPlaceholder } from '../../../Assets';

const Profile = () => {
    const [openProfileCropper, setOpenProfileCropper] = useState(false);
    const [openLogoCropper, setOpenLogoCropper] = useState(false);
    const [profileUrl, setProfileUrl] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [tabValue, setTabValue] = useState(0)
    const [userObj, setUserObj] = useState({});
    const [alerts, setAlerts] = useState(true);
    const [infoMsg, setInfoMsg] = useState('');
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();
    const inputFileL = useRef(null);
    const inputFileP = useRef(null);
    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: yup.object({
            currentPassword: yup
            .string()
            .min(8, 'Senha deve ter mais de 8 caracteres')
            .required('Senha atual é obrigatório'),
            newPassword: yup
            .string()
            .min(8, 'Senha deve ter mais de 8 caracteres')
            .required("Senha é obrigatório"),
            confirmPassword: yup.string().when("newPassword", {
                is: val => (val && val.length > 0 ? true : false),
                then: yup.string().oneOf(
                [yup.ref("newPassword")],
                "Senha não confere com a confirmação."
                )
            })
        }),
        onSubmit: (values, onSubmitProps) => {
            updatePassword(values, onSubmitProps)
        },
    });

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        try {
            console.log(AuthService.getLoggedUser())
            setUserObj(AuthService.getLoggedUser());
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setInfoMsg('Não foi possivel carregar as informações, tente novamente mais tarde.');
            setToggleFailureSnack(true);
        }
    }

    const updatePassword = async (values, onSubmitProps) => {
        setIsLoading(true);
        const data = {
            oldPassword: values.currentPassword,
            password: values.newPassword
        }
        try {
            await UserService.update(data);
            onSubmitProps.resetForm();
            setIsLoading(false)
            setInfoMsg('Senha atualizada.')
            setToggleSuccessSnack(true);
        } catch (error) {
            console.log(error);
            setInfoMsg("Ocorreu um erro ao atualizar a senha.");
            setToggleFailureSnack(true);
        }
    }

    const handleLogoImg = (file) => {
        setLogoUrl(URL.createObjectURL(file))
        setOpenLogoCropper(true)
    }
    
    const handleProfileImg = (file) => {
        setProfileUrl(URL.createObjectURL(file))
        setOpenProfileCropper(true)
    }
    
    const submitProfile = async (file) => {
        setIsLoading(true);
        try {
            let data = new FormData();
            data.append('image', file);
            await UserService.update(data);
            const user = await AuthService.getUserOff();
            AuthService.updateLoggedUser(user.data)
            fetchData()
            setIsLoading(false)
            setInfoMsg("Foto de perfil atualizada.")
            setToggleSuccessSnack(true);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setInfoMsg('Ocorreu um erro ao atuliazar');
            setToggleFailureSnack(true);
        }
    }

    const submitLogo = async (file) => {
        setIsLoading(true);
        try {
            let data = new FormData();
            data.append('image', file);
            await UserService.updateStablishment(data);
            const user = await AuthService.getUserOff();
            AuthService.updateLoggedUser(user.data)
            fetchData()
            setIsLoading(false)
            setInfoMsg("Logo atualizado.")
            setToggleSuccessSnack(true);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setInfoMsg('Ocorreu um erro ao atuliazar.');
            setToggleFailureSnack(true);
        }
    }

    return (
        <div>
            <ImageCropper open={openProfileCropper} close={() => setOpenProfileCropper(false)} url={profileUrl} handleChange={submitProfile}/>
            <ImageCropper open={openLogoCropper} close={() => setOpenLogoCropper(false)} url={logoUrl} handleChange={submitLogo}/>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar toggleSnack={toggleSuccessSnack || toggleFailureSnack} time={toggleFailureSnack ? 4500 : 3500} onClose={() => {setToggleFailureSnack(false); setToggleSuccessSnack(false)}}  color={toggleSuccessSnack ? "success" : "warning"}>
                {infoMsg}
            </Snackbar>
            <div className={classes.header}>
                <Typography variant="h5">
                    Minha conta
                </Typography>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <MuiLink color="inherit" component={Link} to="/">
                        Home
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="#">
                        Minha conta
                    </MuiLink>
                </Breadcrumbs>
            </div>
            <div>
                <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)}>
                    <Tab label="Perfil"/>
                    <Tab label="Loja"/>
                    <Tab label="Notificações"/>
                    <Tab label="Meu QR code"/>
                    <Tab label="Segurança"/>
                    <Tab label="Termos de uso"/>
                </Tabs>
            </div>
            <Divider/>
            <div>
                <div role="tabpanel" hidden={tabValue !== 0} id={`full-width-tabpanel-${0}`}>
                    {tabValue === 0 && (
                        <div className={classes.spacing}>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <Paper variant="outlined" className={classes.paperContent}>
                                        <Grid container spacing={4} direction="column" alignItems="center">
                                            <Grid item xs={12}>
                                                <Avatar src={process.env.REACT_APP_BASE_URL +  userObj.photo} alt={userObj.name} className={classes.usrProfile}/>
                                            </Grid>
                                            <Grid item xs={12} style={{textAlign: 'center'}}>
                                                <Typography variant="subtitle2">
                                                    {userObj.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MuiButton color="primary" variant="outlined" onClick={() => inputFileP.current.click()}>
                                                    Alterar foto de perfil
                                                </MuiButton>
                                                <input accept="image/*" hidden id="profileInput" type="file" ref={inputFileP} onChange={(e) => handleProfileImg(e.target.files[0])}/>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={9}>
                                    <Paper variant="outlined" style={{marginBottom: '20px'}}>
                                        <div className={classes.paperHeader}>
                                            <Typography variant="h6">
                                                Dados Pessoais
                                            </Typography>
                                        </div>
                                        <Divider/>
                                        <div className={classes.paperContent}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Nome:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        Email:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.email}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        CPF:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.cpf}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Paper>    
                                    <Paper variant="outlined">
                                        <div className={classes.paperHeader}>
                                            <Typography variant="h6">
                                                Endereço Pessoal
                                            </Typography>
                                            <Tooltip title="Editar">
                                                <IconButton color="primary" component={Link} to={`/dashboard/edit-address/0`}>
                                                    <EditIcon fontSize="default" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                        <Divider/>
                                        <div className={classes.paperContent}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        CEP:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.address?.zip || "- - -"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        Logradouro:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.address?.street || "- - -"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        Numero:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.address?.number || "- - -"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        Complemento:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.address?.complementation || "- - -"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        Bairro:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.address?.neighborhood || "- - -"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        Cidade:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.address?.city || "- - -"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        Estado:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.address?.state || "- - -"}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </div>
                <div role="tabpanel" hidden={tabValue !== 1} id={`full-width-tabpanel-${1}`}>
                    {tabValue === 1 && (
                        <div className={classes.spacing}>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <Paper variant="outlined" className={classes.paperContent}>
                                        <Grid container spacing={4} direction="column" alignItems="center">
                                            <Grid item xs={12}>
                                                <Avatar src={process.env.REACT_APP_BASE_URL + 'imgs/' + userObj.stablishment?.photo} alt={userObj.stablishment?.name} className={classes.usrProfile}/>
                                            </Grid>
                                            <Grid item xs={12} style={{textAlign: 'center'}}>
                                                <Typography variant="subtitle2">
                                                    {userObj.stablishment?.name}
                                                </Typography>
                                                <Typography variant="overline">
                                                    Assinatura: Gratuita
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <MuiButton color="primary" variant="outlined" onClick={() => inputFileL.current.click()}>
                                                    Alterar logo
                                                </MuiButton>
                                                <input accept="image/*" hidden id="logoInput" type="file" ref={inputFileL} onChange={(e) => handleLogoImg(e.target.files[0])}/>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={9}>
                                    <Paper variant="outlined" style={{marginBottom: '20px'}}>
                                        <div className={classes.paperHeader}>
                                            <Typography variant="h6">
                                                Dados da Loja
                                            </Typography>
                                            <Tooltip title="Editar">
                                                <IconButton color="primary" component={Link} to="/dashboard/edit-stablishment">
                                                    <EditIcon fontSize="default" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                        <Divider/>
                                        <div className={classes.paperContent}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <Typography variant="subtitle1">
                                                        Nome da loja:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.stablishment?.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        CNPJ:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.stablishment?.cnpj}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        Telefone:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.stablishment?.phone}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Paper>    
                                    <Paper variant="outlined">
                                        <div className={classes.paperHeader}>
                                            <Typography variant="h6">
                                                Endereço da Loja
                                            </Typography>
                                            <Tooltip title="Editar">
                                                <IconButton color="primary" component={Link} to={`/dashboard/edit-address/1`}>
                                                    <EditIcon fontSize="default" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                        <Divider/>
                                        <div className={classes.paperContent}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        CEP:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.stablishment?.address?.zip}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        Logradouro:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.stablishment?.address?.street}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        Numero:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.stablishment?.address?.number}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        Complemento:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.stablishment?.address?.complementation || "- - -"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        Bairro:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.stablishment?.address?.neighborhood}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        Cidade:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.stablishment?.address?.city}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subtitle1">
                                                        Estado:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userObj.stablishment?.address?.state}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>    
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </div>
                <div role="tabpanel" hidden={tabValue !== 2} id={`full-width-tabpanel-${2}`}>
                    {tabValue === 2 && (
                        <div className={classes.spacing}>
                            <Paper variant="outlined">
                                <div className={classes.paperHeader}>
                                    <Typography variant="h6">
                                        Notificações
                                    </Typography>
                                </div>
                                <Divider/>
                                <div className={classes.paperContent}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <FormControlLabel
                                            control={<Checkbox checked={alerts} onChange={() => setAlerts(!alerts)} name="Alerts"/>}
                                            label="Alertas de Notificações"/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControlLabel
                                            control={<Checkbox checked={alerts} onChange={() => setAlerts(!alerts)} name="Alerts"/>}
                                            label="Alertas de Notificações"/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControlLabel
                                            control={<Checkbox checked={alerts} onChange={() => setAlerts(!alerts)} name="Alerts"/>}
                                            label="Alertas de Notificações"/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControlLabel
                                            control={<Checkbox checked={alerts} onChange={() => setAlerts(!alerts)} name="Alerts"/>}
                                            label="Alertas de Notificações"/>
                                        </Grid>
                                    </Grid>
                                </div>
                                <Divider/>
                                <div className={classes.paperFooter}>
                                    <MuiButton variant="contained" color="primary">
                                        Salvar
                                    </MuiButton>
                                </div>
                            </Paper>
                        </div>
                    )}
                </div>
                <div role="tabpanel" hidden={tabValue !== 3} id={`full-width-tabpanel-${3}`}>
                    {tabValue === 3 && (
                        <div className={classes.spacing}>
                            <Paper variant="outlined">
                                <div className={classes.paperHeader}>
                                    <Typography variant="h6">
                                        QR code 
                                    </Typography>
                                </div>
                                <Divider/>
                                <div className={classes.paperContent}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <Card variant="outlined">
                                                <CardActionArea>
                                                    <img src={ProductPlaceholder} className={classes.qrcode}/>
                                                </CardActionArea>
                                                <CardActions>
                                                    <IconButton>
                                                        <GetAppIcon/>
                                                    </IconButton>
                                                    <IconButton>
                                                        <FileCopyIcon/>
                                                    </IconButton>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Paper>
                        </div>
                    )}
                </div>
                <div role="tabpanel" hidden={tabValue !== 4} id={`full-width-tabpanel-${4}`}>
                    {tabValue === 4 && (
                        <div className={classes.spacing}>
                            <Paper variant="outlined">
                                <div className={classes.paperHeader}>
                                    <Typography variant="h6">
                                        Alterar senha
                                    </Typography>
                                </div>
                                <Divider/>
                                <FormikProvider value={formik}>
                                    <Form>
                                        <div className={classes.paperContent}>
                                            <Grid container spacing={3} direction="column">
                                                <Grid item xs={6}>
                                                    <Textfield name="currentPassword" value={formik.values.currentPassword} onChange={formik.handleChange} variant="outlined" fullWidth label="Senha Atual" type="password"/>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Textfield name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} variant="outlined" fullWidth label="Nova senha" type="password"/>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Textfield name="confirmPassword" values={formik.values.confirmPassword} onChange={formik.handleChange} variant="outlined" fullWidth label="Confirmar senha" type="password"/>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <Divider/>
                                        <div className={classes.paperFooter}>
                                            <FButton type="submit">
                                                Salvar
                                            </FButton>
                                        </div>
                                    </Form>
                                </FormikProvider>
                            </Paper>
                        </div>
                    )}
                </div>
                <div role="tabpanel" hidden={tabValue !== 5} id={`full-width-tabpanel-${5}`}>
                    {tabValue === 5 && (
                        <div className={classes.spacing}>
                            <Paper variant="outlined">
                                <div className={classes.paperHeader}>
                                    <Typography variant="h6">
                                        Termos de uso
                                    </Typography>
                                </div>
                                <Divider/>
                                <div className={classes.paperContent}>
                                    {UseTerms()}
                                </div>
                            </Paper>
                        </div>
                    )}
                </div> 
            </div>
        </div>
    )
}

export default Profile;
