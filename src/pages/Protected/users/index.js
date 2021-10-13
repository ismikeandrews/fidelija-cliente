import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SearchIcon from '@material-ui/icons/Search';
import { 
  Typography,
  Link as MuiLink,
  Breadcrumbs,
  Backdrop,
  Container,
  CircularProgress,
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
  useTheme,
  IconButton,
  TablePagination,
  Divider,
  Avatar,
  Tabs,
  Tab,
  Select,
  MenuItem
} from '@material-ui/core';
import { PeopleSvg } from '../../../Assets'
import { Snackbar } from '../../../Components';
import { UserService } from '../../../Services';
import { useStyles } from './UsersElements';

function Users() {
  const classes = useStyles();
  const theme = useTheme();
  const timeoutRef = useRef(null);
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [lastPage, setLastPage] = useState(null);
  const [feedbackAlert, setFeedbackAlert] = useState('');
  const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    fetchData(page, item);
  }, []);

  const fetchData = async (currentPage, rowsPerPage) => {
    try {
      const clientRes = await UserService.getClientList(currentPage, rowsPerPage);
      console.log(clientRes.data);
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

  return (
    <div>
      <Snackbar toggleSnack={toggleFailureSnack} time={4000} color="warning">
        {feedbackAlert}
      </Snackbar>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className={classes.header}>
        <Typography variant="h5">
          Meus usuários
        </Typography>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
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
                              endAdornment={<InputAdornment position="end"><SearchIcon color="primary"/></InputAdornment>}/>
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
                        <TableCell align="left">Valor total</TableCell>
                        <TableCell align="right">Pontos acumulados</TableCell>
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
                          <TableCell align="left">R$ 300,00</TableCell>
                          <TableCell align="right">{user.pontos} <spam>pts.</spam></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={userList.length - 1}
                  rowsPerPage={item}
                  page={page - 1}
                  onChangePage={() => null}
                  labelRowsPerPage="Produtos por página:"
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== 0 ? count : `more than ${to}`}`}
                  onChangeRowsPerPage={(event) => fetchData(1, event.target.value)}
                  ActionsComponent={() => (
                      <div className={classes.paginationIcons}>
                          <IconButton
                              onClick={() => fetchData(1, item)}
                              disabled={page === 1}
                              aria-label="first page">
                              {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                          </IconButton>
                          <IconButton 
                              onClick={() => fetchData(page - 1, item)} 
                              disabled={page === 1} 
                              aria-label="previous page">
                              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                          </IconButton>
                          <IconButton
                              onClick={() => fetchData(page + 1, item)}
                              disabled={page === lastPage}
                              aria-label="next page">
                              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                          </IconButton>
                          <IconButton
                              onClick={() => fetchData(lastPage, item)}
                              disabled={page === lastPage}
                              aria-label="last page">
                              {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                          </IconButton>
                      </div>
                  )}/>
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