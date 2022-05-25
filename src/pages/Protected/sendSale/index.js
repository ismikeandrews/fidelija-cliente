import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Typography, Breadcrumbs, Link as MuiLink, Grid, Paper, TextField, List, ListItem, Avatar, ListItemAvatar, ListItemText, Button, MenuItem, FormControl, InputLabel, Select} from "@material-ui/core";
import { NavigateNext } from '@material-ui/icons';
import { Styles } from './sendSale.elements';
import { Snackbar, Backdrop } from '../../../Components'
import { UserService } from '../../../Services';
import InputMask from 'react-input-mask';
import { AccountBox } from '@material-ui/icons';

const sales = [
  {
    name: "Compra antecipada",
    id: 1,
  },
  {
    name: "Desconto de 15%",
    id: 2,
  },
  {
    name: "Brinde de dia das Mães",
    id: 3,
  },
  {
    name: "Compre 2 leve 3",
    id: 4,
  }
]

const SendSale = () => {
  const [cpf, setCpf] = useState('');
  const [user, setUser] = useState(null);
  const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false);
  const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [saleId, setSaleId] = useState(null);
  const classes = Styles();

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

  const sendSale = async () => {
    console.log("teste")
  }

  return (
    <div>
       <Snackbar toggleSnack={toggleSuccessSnack || toggleFailureSnack} time={toggleFailureSnack ? 4500 : 3500} onClose={() => {setToggleFailureSnack(false); setToggleSuccessSnack(false)}}  color={toggleSuccessSnack ? "success" : "warning"}>
          {infoMsg}
      </Snackbar>
      <Backdrop open={isLoading}/>
      <div className={classes.header}>
          <Typography variant="h5">
              Enviar Promoção
          </Typography>
          <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
              <MuiLink color="inherit" component={Link} to="/">
                  Home
              </MuiLink>
              <MuiLink color="inherit" component={Link} to="#">
                  Enviar Promoção
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
                  <FormControl fullWidth variant="outlined"  className={classes.formControl}>
                      <InputLabel id="multi">Promoção</InputLabel>
                      <Select
                      labelId="multi"
                      value={saleId}
                      onChange={e => setSaleId(e.target.value)}
                      label="Promoção">
                        {sales.map(sale => (
                          <MenuItem key={sale.id} value={sale.id}>{sale.name}</MenuItem>
                        ))}
                      </Select>
                  </FormControl>
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
                  </List>
                  <div style={{padding: "10px"}}>
                      <Button variant="contained" className={classes.button} fullWidth onClick={sendSale}>
                          Enviar
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

export default SendSale