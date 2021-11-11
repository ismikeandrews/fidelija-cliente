import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Paper,
    Grid,
    Avatar,
    Button,
    TextField,
    Breadcrumbs,
    Link as MuiLink,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@material-ui/core';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { Styles } from './redeem.elements';
import { VoucherService } from '../../../Services';
import { AlertDialog, Backdrop, Snackbar } from '../../../Components';
import { ShoppingBasket, ShowChart, AttachMoney, CalendarToday, } from '@material-ui/icons';

const Redeem = () => {
    const classes = Styles();
    const [voucherId, setVoucherId] = useState('');
    const [voucher, setVoucher] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogText, setDialogText] = useState('');
    const [toggleDialog, setToggleDialog] = useState(false);
    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [snackText, setSnackText] = useState('');

    const fetchVoucher = async (e) => {
        setIsLoading(true)
        if(e.key === 'Enter'){
            try {
                const { data } = await VoucherService.getVoucher(voucherId);
                setVoucher(data)
                setIsLoading(false)
                if (!data.is_valid) {
                    setDialogTitle('Voucher inválido')
                    setDialogText(data.entrega)
                    setToggleDialog(true);
                }
                if (!data) {
                    setDialogText('Voucher não encontrado.');
                    setToggleDialog(true);
                }
            } catch (error) {
                console.log(error)
                setIsLoading(false);
                setSnackText('Ocorreu um erro, tente novamente.');
                setToggleFailureSnack(true);
            }
        }
    }

    const completeVoucher = async () => {
        setIsLoading(true)
        setVoucher(null)
        const data = {voucherId}
        try {
            await VoucherService.completeVoucher(data);
            setIsLoading(false)
            setSnackText('Resgate concluido com sucesso.');
            setToggleSuccessSnack(true);
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setSnackText('Não foi possivel efetuar o resgate.');
            setToggleFailureSnack(true);
        }  
    }

    return (
        <div>
            <Snackbar toggleSnack={toggleSuccessSnack || toggleFailureSnack} time={toggleFailureSnack ? 4500 : 3500} onClose={() => {setToggleFailureSnack(false); setToggleSuccessSnack(false)}}  color={toggleSuccessSnack ? "success" : "warning"}>
                {snackText}
            </Snackbar>
            <Backdrop open={isLoading}/>
            <AlertDialog open={toggleDialog} close={() => setToggleDialog(false)} title={dialogTitle} text={dialogText}/>
            <div className={classes.header}>
                <div>
                    <Typography variant="h5">
                        Resgate
                    </Typography>
                    <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                        <MuiLink color="inherit" component={Link} to="/">
                            Home
                        </MuiLink>
                        <MuiLink color="inherit" component={Link} to="#">
                            Resgate
                        </MuiLink>
                    </Breadcrumbs>
                </div>
            </div>
            <div className={classes.content}>
                <Grid container spacing={3} direction="column">
                    <Grid item xs={5}>
                        <Paper variant="outlined" className={classes.paperContent}>
                            <TextField variant="outlined" fullWidth value={voucherId} onChange={e => setVoucherId(e.target.value)} onKeyPress={fetchVoucher} placeholder="Código do voucher"/>
                        </Paper>
                    </Grid>
                    {voucher && (
                        <Grid item xs={5}>
                             <Paper variant="outlined">
                                <div className={classes.imageContainer}>
                                    <Avatar className={classes.productPicture} src={process.env.REACT_APP_BASE_URL + voucher.product.image}/>
                                </div>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ShoppingBasket/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Produto" secondary={voucher.product.name}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ShowChart/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Estoque" secondary={voucher.product.stock}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AttachMoney/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Valor em pontos" secondary={voucher.product.cost}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <CalendarToday/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Validade" secondary={voucher.limit_date}/>
                                    </ListItem>
                                </List>
                                {voucher.is_valid && (
                                    <div style={{padding: "10px"}}>
                                        <Button className={classes.button} fullWidth variant="contained" onClick={() => completeVoucher()}>
                                            Confirmar
                                        </Button>
                                    </div>
                                )}
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </div>
        </div>
    )
}

export default Redeem
