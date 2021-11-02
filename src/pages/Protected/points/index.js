import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import { 
    Backdrop,
    CircularProgress,
    Typography,
    Breadcrumbs,
    Link as MuiLink,
    Grid,
    Paper,
    TextField,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Button
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { AccountBox, MonetizationOn, Receipt, AccountBalance} from '@material-ui/icons';
import { styles } from './points.elements';
import { Snackbar } from '../../../Components'
import { UserService, AuthService } from '../../../Services';

const Points = () => {
    const [cpf, setCpf] = useState('');
    const [ammount, setAmmount] = useState('');
    const [reference, setReference] = useState('');
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const classes = styles();

    const searchUser = async () => {
        setIsLoading(true)
        const data = {cpf}   
        try {
            const res = await UserService.getUserByCpf(data)
            console.log(res.data)
            setUser(res.data)
            setIsLoading(false)
            if(!res.data && cpf.length > 0){
                setInfoMsg("Usuário não encontrado.")
                setToggleFailureSnack(true);
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setInfoMsg("Não foi possível buscar o usuário.")
            setToggleFailureSnack(true);
        }
    }

    const submitScore = async () => {
        setIsLoading(false);
        const data = {
            user_id: user.id, 
            ammount: ammount,
            reference: reference,
            employeeId: AuthService.getLoggedUser().id
        }
        try {
            await UserService.registerPoints(data)
            setUser(null)
            setAmmount('');
            setCpf('');
            setReference('');
            setIsLoading(false);
            setInfoMsg("Usuário pontuado com sucesso.");
            setToggleSuccessSnack(true);
        } catch (error) {
            setIsLoading(false)
            setInfoMsg("Não foi possivel pontuar o usuário")
            setToggleFailureSnack(true)
            console.log(error)
        }
    }

    return (
        <div>
            <Snackbar toggleSnack={toggleSuccessSnack || toggleFailureSnack} time={toggleFailureSnack ? 4500 : 3500} onClose={() => {setToggleFailureSnack(false); setToggleSuccessSnack(false)}}  color={toggleSuccessSnack ? "success" : "warning"}>
                {infoMsg}
            </Snackbar>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
           <div className={classes.header}>
                <Typography variant="h5">
                    Pontuar usuário
                </Typography>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <MuiLink color="inherit" component={Link} to="/">
                        Home
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="#">
                        Pontuar usuário
                    </MuiLink>
                </Breadcrumbs>
            </div>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper variant="outlined" className={classes.paperContent}>
                            <Typography variant="h6">Digite o CPF do usuário</Typography>
                            <div>
                                <InputMask required mask="999.999.999-99" maskChar="" value={cpf} onChange={e => setCpf(e.target.value)} onBlur={searchUser}>
                                    {props => (
                                        <TextField {...props} label="CPF" type="text" variant="outlined" fullWidth margin="normal"/>
                                    )}
                                </InputMask>
                                <TextField required label="Referência" variant="outlined" value={reference} onChange={e => setReference(e.target.value)} fullWidth margin="normal"/>
                                <TextField required label="Valor da compra" variant="outlined" value={ammount} onChange={e => setAmmount(e.target.value)} fullWidth margin="normal"/>
                            </div>
                        </Paper>
                    </Grid>
                    {user && (
                        <Grid item xs={6}>
                            <Paper variant="outlined" className={classes.paperContent}>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src={process.env.REACT_APP_BASE_URL + user.photo}/>
                                        </ListItemAvatar>
                                        <ListItemText>{user.name}</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar style={{backgroundColor: "#604bd2"}}>
                                                <AccountBox/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText>{user.cpf}</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar style={{backgroundColor: "#604bd2"}}>
                                                <Receipt/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText>{reference || '- - -'}</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar style={{backgroundColor: "#604bd2"}}>
                                                <AccountBalance/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText>{user.stablishment_points || "- - -"}</ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar style={{backgroundColor: "rgb(38 165 43)"}}>
                                                <MonetizationOn/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText>{Math.ceil(ammount * 5)}</ListItemText>
                                    </ListItem>
                                </List>
                                <div style={{padding: "10px"}}>
                                    <Button variant="contained" className={classes.button} fullWidth disabled={ammount === '' || reference === ''} onClick={submitScore}>
                                        Pontuar
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </div>
        </div>
    )
}

export default Points
