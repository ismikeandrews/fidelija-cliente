import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFormik, FormikProvider, Form } from 'formik';
import * as yup from 'yup';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { Typography, Breadcrumbs, Link as MuiLink, Paper, Grid } from '@material-ui/core';
import { AuthService, AddressService, UserService } from '../../../Services';
import { Snackbar, MaskedTextField, Textfield, FButton, Backdrop } from '../../../Components';
import { Styles } from './edit-address.elements';

const EditAddress = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const { id } = useParams();
    const classes = Styles();

    const formik = useFormik({
        initialValues: {
            street: '',
            postalcode: '',
            city: '',
            state: '',
            number: '',
            addressLine: '',
            neighborhood: '',
        },
        validationSchema: yup.object({
            street: yup
            .string()
            .required("Logradouro é obrigatório"),
            postalcode: yup
            .string()
            .required("CEP é obrigatório"),
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
            .string()
            .nullable(),
            neighborhood: yup
            .string()
            .required("Bairro é obrigatório"),
        }),
        onSubmit: (values, onSubmitProps) => {
            submitAddress(values, onSubmitProps)
        },
    });

    useEffect(() => {
        fetchData()
    }, [])

    const searchPostalCode = async (e) => {
        formik.handleChange(e)
        if(e.target.value.length === 9){
            try {
                const { data } = await AddressService.getAddress(e.target.value);
                if(data.erro){
                    setInfoMsg("Endereço não encotrado");
                    setToggleFailureSnack(true);
                    formik.setFieldValue('street', '');
                    formik.setFieldValue('neighborhood', '');
                    formik.setFieldValue('city', '');
                    formik.setFieldValue('state', '');
                };
                formik.setFieldValue('street', data.logradouro);
                formik.setFieldValue('neighborhood', data.bairro);
                formik.setFieldValue('city', data.localidade);
                formik.setFieldValue('state', data.uf);
            } catch (error) {
                console.log(error);
                setInfoMsg("Ocorreu um erro ao se comunicar com o servidor, tente novamente mais tarde.")
                setToggleFailureSnack(true)
            }
        }
    }

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const { stablishment, address } = await AuthService.getLoggedUser();
            if(id === '0'){
                if(address !== null){
                    formik.setFieldValue('street', address.street)
                    formik.setFieldValue('postalcode', address.zip)
                    formik.setFieldValue('neighborhood', address.neighborhood)
                    formik.setFieldValue('city', address.city)
                    formik.setFieldValue('state', address.state)
                    formik.setFieldValue('number', address.number)
                    formik.setFieldValue('addressLine', address.complementation)
                    setIsLoading(false)
                }
                setIsLoading(false)
            }
            if(id === '1'){
                formik.setFieldValue('street', stablishment.address.street)
                formik.setFieldValue('postalcode', stablishment.address.zip)
                formik.setFieldValue('neighborhood', stablishment.address.neighborhood)
                formik.setFieldValue('city', stablishment.address.city)
                formik.setFieldValue('state', stablishment.address.state)
                formik.setFieldValue('number', stablishment.address.number)
                formik.setFieldValue('addressLine', stablishment.address.complementation)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
            setInfoMsg("Ocorreu um erro ao buscar os dados")
            setToggleFailureSnack(true)
        }
    }

    const submitAddress = async (values, onSubmitProps) => {
        setIsLoading(true);
        const data = {
            street: values.street,
            city: values.city,
            zip: values.postalcode,
            neighborhood: values.neighborhood,
            state: values.state,
            complementation: values.addressLine,
            number: values.number
        }
        if (id === '0') {
            try {
                console.log(data)
                await AddressService.editUserAddress(data)
                await UserService.refreshUser();
                fetchData()
                setIsLoading(false);
                setInfoMsg("Endereço atualizado");
                setToggleSuccessSnack(true);
            } catch (error) {
                console.log(error)
                setIsLoading(false)
                setInfoMsg("Ocorreu um erro, tente novamente mais tarde");
                setToggleFailureSnack(true);
            }
        }
        if(id === '1') {
            try {
                await AddressService.editStablishmentAddress(data);
                await UserService.refreshUser();
                fetchData()
                setIsLoading(false)
                setInfoMsg("Endereço atualizado");
                setToggleSuccessSnack(true);
            } catch (error) {
                console.log(error)
                setIsLoading(false)
                setInfoMsg("Ocorreu um erro, tente novamente mais tarde");
                setToggleFailureSnack(true);
            }
        }
    }

    return (
        <div>
            <Snackbar toggleSnack={toggleSuccessSnack || toggleFailureSnack} time={toggleFailureSnack ? 4500 : 3500} onClose={() => {setToggleFailureSnack(false); setToggleSuccessSnack(false)}}  color={toggleSuccessSnack ? "success" : "warning"}>
                {infoMsg}
            </Snackbar>
            <Backdrop open={isLoading}/>
            <div className={classes.header}>
                <Typography variant="h5">
                    Editar endereço {id === '0' ? 'pessoal' : id === '1' ? 'da loja' : ''}
                </Typography>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                    <MuiLink color="inherit" component={Link} to="/">
                        Home
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="/dashboard/profile">
                        Minha conta
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="#">
                        Editar endereço
                    </MuiLink>
                </Breadcrumbs>
            </div>
            <div>
                <Paper variant="outlined" className={classes.paperContent}>
                    <FormikProvider value={formik}>
                        <Form>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <MaskedTextField mask="99999-999" value={formik.values.postalcode} onChange={(e) => searchPostalCode(e)} name="postalcode" label="CEP"/>
                                </Grid>  
                                <Grid item xs={6}>
                                    <Textfield name="street" variant="outlined" label="Logradouro" value={formik.values.street} onChange={formik.handleChange}/>
                                </Grid>  
                                <Grid item xs={6}>
                                    <Textfield name="neighborhood" variant="outlined" label="Bairro" value={formik.values.neighborhood} onChange={formik.handleChange}/>
                                </Grid>  
                                <Grid item xs={6}>
                                    <Textfield name="city" variant="outlined" label="Cidade" value={formik.values.city} onChange={formik.handleChange}/>
                                </Grid>  
                                <Grid item xs={6}>
                                    <Textfield name="state" variant="outlined" label="Estado" value={formik.values.state} onChange={formik.handleChange}/>
                                </Grid>  
                                <Grid item xs={6}>
                                    <Textfield name="number" variant="outlined" label="Numero" value={formik.values.number} onChange={formik.handleChange}/>
                                </Grid>  
                                <Grid item xs={6}>
                                    <Textfield name="addressLine" variant="outlined" label="Complemento" value={formik.values.addressLine} onChange={formik.handleChange}/>
                                </Grid>  
                                <Grid item xs={12}>
                                    <FButton type="submit">Salvar</FButton>
                                </Grid>
                            </Grid>
                        </Form>
                    </FormikProvider>
                </Paper>
            </div>
        </div>
    )
}

export default EditAddress;