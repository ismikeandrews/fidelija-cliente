import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  TableFooter,
  TablePagination,
  IconButton,
  CircularProgress,
  Modal
} from '@material-ui/core';

import { userService } from '../../../services';

let searchTimer;

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));


function Users() {
  const classes = useStyles();
  const theme = useTheme();

  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [lastPage, setLastPage] = useState(null);


  useEffect(() => {
    fetchClients(page, rowsPerPage)
  }, []);

  const fetchClients = async (page, length) => {
    try {
      const clientRes = await userService.getClientList(page, length);
      setPage(clientRes.data.current_page)
      setRowsPerPage(clientRes.data.per_page)
      setLastPage(clientRes.data.last_page)
      setUserList(clientRes.data.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  
    clearTimeout(searchTimer);
    searchTimer = setTimeout( async () => {
      try {
        const res = await userService.searchUser(searchTerm, page, rowsPerPage);
        setUserList(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }, 1000);
  }

  return (
    <>
      {isLoading ?
          <Modal className={classes.center} disableEnforceFocus disableAutoFocus open>
              <CircularProgress color="primary" />
          </Modal>
          :
          <>
            <TextField label="Procurar" value={searchTerm} onChange={e => handleSearch(e)}/>

            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="right">Usuario</TableCell>
                      <TableCell align="right">Estabelecimento</TableCell>
                      <TableCell align="right">Pontos</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {userList.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell component="th" scope="row">{user.id}</TableCell>
                      <TableCell align="right">{user.client}</TableCell>
                      <TableCell align="right">{user.stablishment}</TableCell>
                      <TableCell align="right">{user.pontos}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, 100]}
                      colSpan={5}
                      count={userList.length - 1}
                      rowsPerPage={rowsPerPage}
                      page={page - 1}
                      SelectProps={{inputProps: { 'aria-label': 'rows per page' }}}
                      onChangePage={() => null}
                      onChangeRowsPerPage={(event) => fetchClients(1, event.target.value)}
                      ActionsComponent={() => (
                        <div className={classes.root}>
                          <IconButton
                            onClick={() => fetchClients(1, rowsPerPage)}
                            disabled={page === 1}
                            aria-label="first page">
                            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                          </IconButton>
                          <IconButton 
                            onClick={() => fetchClients(page - 1, rowsPerPage)} 
                            disabled={page === 1} 
                            aria-label="previous page">
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                          </IconButton>
                          <IconButton
                            onClick={() => fetchClients(page + 1, rowsPerPage)}
                            disabled={page === lastPage}
                            aria-label="next page">
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                          </IconButton>
                          <IconButton
                            onClick={() => fetchClients(lastPage, rowsPerPage)}
                            disabled={page === lastPage}
                            aria-label="last page">
                            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                          </IconButton>
                        </div>
                    )}/>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </>
      }
    </>
  );
}

export default Users;