import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import moment from 'moment';

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

function History() {
    const classes = useStyles();
    const theme = useTheme();
  
    const [historyList, setHistoryList] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [lastPage, setLastPage] = useState(null);

    useEffect(() => {
        fetchHistory(page, rowsPerPage);
    }, []);

    const fetchHistory = async (page, length) => {
        try {
            const res = await userService.getUserHistory(page, length); 
            setPage(res.data.current_page)
            setHistoryList(res.data.data);
            setRowsPerPage(parseInt(res.data.per_page))
            setLastPage(res.data.last_page)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            {isLoading ?
                <Modal className={classes.center} disableEnforceFocus disableAutoFocus open>
                    <CircularProgress color="primary" />
                </Modal>
                :
                <>

                    <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Data</TableCell>
                            <TableCell align="right">Nome</TableCell>
                            <TableCell align="right">Produto</TableCell>
                            <TableCell align="right">Pontuação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {historyList.map((history) => (
                            <TableRow key={history.id}>
                                <TableCell component="th" scope="row">{history.id}</TableCell>
                                <TableCell align="right">{moment(history.created_at).format("DD/MM/YYYY - HH:MM")}</TableCell>
                                <TableCell align="right">{history.client}</TableCell>
                                <TableCell align="right">{history.product}</TableCell>
                                <TableCell align="right">{history.amount}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                        <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            colSpan={5}
                            count={historyList.length - 1}
                            rowsPerPage={rowsPerPage}
                            page={page - 1}
                            SelectProps={{inputProps: { 'aria-label': 'rows per page' }}}
                            onChangePage={() => null}
                            onChangeRowsPerPage={(event) => fetchHistory(1, event.target.value)}
                            ActionsComponent={() => (
                                <div className={classes.root}>
                                <IconButton
                                    onClick={() => fetchHistory(1, rowsPerPage)}
                                    disabled={page === 1}
                                    aria-label="first page">
                                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                                </IconButton>
                                <IconButton 
                                    onClick={() => fetchHistory(page - 1, rowsPerPage)} 
                                    disabled={page === 1} 
                                    aria-label="previous page">
                                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                </IconButton>
                                <IconButton
                                    onClick={() => fetchHistory(page + 1, rowsPerPage)}
                                    disabled={page === lastPage}
                                    aria-label="next page">
                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </IconButton>
                                <IconButton
                                    onClick={() => fetchHistory(lastPage, rowsPerPage)}
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
    )
};

export default History;
