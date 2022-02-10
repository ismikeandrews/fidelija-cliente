import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { NavigateNext, Search, AttachMoney } from '@material-ui/icons';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Typography, 
  Link as MuiLink, 
  Breadcrumbs, 
  Container, 
  Paper, 
  Grid, 
  FormControl, 
  InputLabel, 
  OutlinedInput, 
  InputAdornment, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Divider, 
  Avatar, 
  Tabs, 
  Tab, 
  Select, 
  MenuItem,
  TextField, 
  IconButton,
  Tooltip,
  Button
} from '@material-ui/core';
import { PeopleSvg } from '../../../Assets'
import { Snackbar, Pagination, Backdrop } from '../../../Components';
import { UserService, AuthService } from '../../../Services';
import { Styles } from './users.elements';

function Users() {
  const classes = Styles();
  const timeoutRef = useRef(null);
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [lastPage, setLastPage] = useState(null);
  const [feedbackAlert, setFeedbackAlert] = useState('');
  const [toggleSuccessSnack, setToggleSuccessSnack] = useState(false)
  const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [ammount, setAmmount] = useState('');
  const [reference, setReference] = useState('');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [toggleDialog, setToggleDialog] = useState(false);

  useEffect(() => {
    fetchData(page, item);
  }, [page, item]);

  const fetchData = async (currentPage, rowsPerPage) => {
    try {
      const clientRes = await UserService.getClientList(currentPage, rowsPerPage);
      setPage(clientRes.data.current_page);
      setItem(clientRes.data.per_page);
      setLastPage(clientRes.data.last_page);
      setUserList(clientRes.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setFeedbackAlert('Ocorreu um erro ao conectar com o servidor, tente novamente mais tarde');
      setToggleFailureSnack(true);
    }
  }

  const handleSearch = (name) => {
    setSearchTerm(name);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(async () => {
      try {
            setIsLoading(true);
            const clientRes = await UserService.searchUser(name, page, item);
            setUserList(clientRes.data.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setFeedbackAlert('Ocorreu um erro ao conectar com o servidor, tente novamente mais tarde');
            setToggleFailureSnack(true);
        }
    }, 500);
  }

  const submitScore = async () => {
    setIsLoading(true);
    setToggleDialog(false);
    const data = {
        user_id: userId, 
        ammount: ammount,
        reference: reference,
        employeeId: AuthService.getLoggedUser().id
    }
    try {
        await UserService.registerPoints(data);
        await fetchData(page, item);
        setAmmount('');
        setReference('');
        setIsLoading(false);
        setFeedbackAlert('Cliente pontuado com sucesso.')
        setToggleSuccessSnack(true)
    } catch (error) {
        console.log(error)
        setIsLoading(false)
        setFeedbackAlert('Não foi possivel pontuar no momento.')
        setToggleFailureSnack(true)
    }
}

  return (
    <div>
      <Snackbar toggleSnack={toggleFailureSnack || toggleSuccessSnack} time={toggleFailureSnack ? 4000 : 3500} color={toggleFailureSnack ? "warning" : "success"}>
        {feedbackAlert}
      </Snackbar>
      <Backdrop open={isLoading}/>
      <Dialog open={toggleDialog} onClose={() => setToggleDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Pontuar cliente
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cliente: {name}
          </DialogContentText>
          <DialogContentText>
            Valor: {ammount * 5}
          </DialogContentText>
          <DialogContentText>
            Referência: {reference}
          </DialogContentText>
          <TextField fullWidth type="number" required variant="outlined" label="Valor" value={ammount} margin="normal" onChange={e => setAmmount(e.target.value)}/>
          <TextField fullWidth required variant="outlined" label="Referencia" value={reference} margin="normal" onChange={e => setReference(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="secondary" onClick={() => setToggleDialog(false)}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={() => submitScore()}>Pontuar</Button>
        </DialogActions>
      </Dialog>
      <div className={classes.header}>
        <Typography variant="h5">
          Meus usuários
        </Typography>
        <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
            <MuiLink color="inherit" component={Link} to="/">
                Home
            </MuiLink>
            <MuiLink color="inherit" component={Link} to="#">
                Usuários
            </MuiLink>
        </Breadcrumbs>
      </div>
      <div>
        {isLoading || (
          <Paper variant="outlined">
            {userList.length > 0 ? (
              <>
                <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)}>
                    <Tab label="Todos"/>
                    <Tab label="Recentes"/>
                    <Tab label="Antigos"/>
                    <Tab label="Melhores clientes"/>
                </Tabs>
                <Divider/>
                <div className={classes.topMenu}>
                  <Grid container spacing={5}>
                      <Grid item xs={4}>
                          <FormControl variant="outlined" fullWidth>
                              <InputLabel htmlFor="search">Procurar</InputLabel>
                              <OutlinedInput
                              id="search"
                              label="procurar"
                              value={searchTerm}
                              onChange={e => handleSearch(e.target.value)}
                              endAdornment={<InputAdornment position="end"><Search color="primary"/></InputAdornment>}/>
                          </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                            <InputLabel id="filter">Filtro</InputLabel>
                            <Select
                            labelId="filter"
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            label="Filtro">
                                 <MenuItem value="filtro1">Filtro 1</MenuItem>
                                 <MenuItem value="filtro2">Filtro 2</MenuItem>
                                 <MenuItem value="filtro3">Filtro 3</MenuItem>
                                 <MenuItem value="filtro4">Filtro 4</MenuItem>
                            </Select>
                        </FormControl>
                      </Grid>
                  </Grid>
                </div>
                <Divider/>
                <div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Nome</TableCell>
                        <TableCell align="left">Localização</TableCell>
                        <TableCell align="left">Ultima visita</TableCell>
                        <TableCell align="center">Pontos acumulados</TableCell>
                        <TableCell align="right">Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userList.map(user => (
                        <TableRow key={user.id} hover>
                          <TableCell align="left">
                            <div className={classes.imgText}>
                              <Avatar alt={user.client} src={process.env.REACT_APP_BASE_URL + user.photo} style={{marginRight: "10px"}}/>
                              {user.client}
                            </div>
                          </TableCell>
                          <TableCell align="left">{user.city} - {user.state}</TableCell>
                          <TableCell align="left">{moment(user.updated_at).format("DD/MM/YYYY - HH:MM")}</TableCell>
                          <TableCell align="center">{user.points} <span>pts.</span></TableCell>
                          <TableCell align="right">
                            <Tooltip title="Pontuar">
                              <IconButton onClick={() => {setName(user.client); setUserId(user.id); setToggleDialog(true);}}>
                                <AttachMoney/>
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Pagination 
                  rows={item} 
                  count={lastPage}
                  changeRows={(e) => fetchData(page, e.target.value)} 
                  changePage={(e, page) => fetchData(page, item)}/>
                </div>
              </>
            ) : (
              <div className={classes.noUsers}>
                  <Container>
                      <img src={PeopleSvg} width="250"/>
                      <Typography variant="h6" className={classes.noUsersMg}>
                          Você ainda não possui usuários.
                      </Typography>
                  </Container>
              </div>
            )}
          </Paper>
        )}
      </div>
    </div>
  );
}

export default Users;