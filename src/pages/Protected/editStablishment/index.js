import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik, FormikProvider, Form } from 'formik'
import NavigateNext from '@material-ui/icons/NavigateNext';
import { Typography, Paper, Grid, Breadcrumbs, Link as MuiLink } from '@material-ui/core';
import { Styles } from './edit-stablishment.elements';
import { AuthService, UserService } from '../../../Services';
import { Snackbar, MaskedTextField, Textfield, FButton, Backdrop } from '../../../Components';

const EditStablishment = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [infoMsg, setInfoMsg] = useState('');
    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const classes = Styles();
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
        },
        validationSchema: yup.object({
            name: yup
            .string()
            .required("Nome é obrigatório"),
            phone: yup
            .string(),
        }),
        onSubmit: (values, onSubmitProps) => {
            submit(values, onSubmitProps)
        },
    });

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        try {
            const res = AuthService.getLoggedUser()
            formik.setFieldValue('name', res.stablishment.name)
            formik.setFieldValue('phone', res.stablishment.phone)
            setIsLoading(false);
        } catch(error) {
            console.log(error)
            setIsLoading(false)
            setInfoMsg('Ocorreu um erro ao buscar os dados');
            setToggleFailureSnack(true)
        }
    }

    const submit = async (values) => {
        setIsLoading(true);
        const data = { name: values.name, phone: values.phone }
        const authObj = AuthService.getAuthData();
        try {
            await UserService.updateStablishment(data);
            await UserService.refreshUser();
            fetchData()
            setIsLoading(false);
            setInfoMsg('Dados atualizados');
            setToggleSuccessSnack(true);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setInfoMsg("Ocorreu um erro ao se comunicar com o servidor, tente novamente mais tarde");
            setToggleFailureSnack(true);
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
                    Dados da Loja
                </Typography>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                    <MuiLink color="inherit" component={Link} to="/">
                        Home
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="/dashboard/profile">
                        Minha conta
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="#">
                        Dados da loja
                    </MuiLink>
                </Breadcrumbs>
            </div>
            <div>
                <Paper variant="outlined" className={classes.paperContent}>
                    <FormikProvider value={formik}>
                        <Form>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Textfield name="name" value={formik.values.name} onChange={formik.handleChange} label="Nome"/>
                                </Grid>
                                <Grid item xs={6}>
                                    <MaskedTextField mask="(99) 99999-9999" name="phone" value={formik.values.phone} onChange={formik.handleChange} label="Telefone"/>
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

export default EditStablishment;