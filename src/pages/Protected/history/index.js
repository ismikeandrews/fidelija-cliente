import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';

import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import {
    Link as MuiLink,
    Breadcrumbs,
    Backdrop,
    CircularProgress,
    Typography,
    IconButton,
    useTheme,
    Paper,
    Tooltip,
    Divider,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Container
} from '@material-ui/core';
import { VoidSvg } from '../../../Assets'
import { Snackbar } from '../../../Components';
import { UserService } from '../../../Services';
import { useStyles } from './HistoryElements';

function History() {
    const classes = useStyles();
    const theme = useTheme();
  
    const [historyList, setHistoryList] = useState([]);
    const [page, setPage] = useState(1);
    const [item, setItem] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [lastPage, setLastPage] = useState(null);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);

    useEffect(() => {
        fetchData(page, item);
    }, []);

    const fetchData = async (currentPage, rowsPerPage) => {
        try {
            const historyRes = await UserService.getUserHistory(currentPage, rowsPerPage); 
            setPage(historyRes.data.current_page);
            setHistoryList(historyRes.data.data);
            setItem(historyRes.data.per_page);
            setLastPage(historyRes.data.last_page);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setToggleFailureSnack(true);
        }
    };

    return (
        <div>
            <Snackbar toggleSnack={toggleFailureSnack} time={4000} color="warning">
                Ocorreu um erro ao carregar os dados, tente novamente mais tarde.
            </Snackbar>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={classes.header}>
                <Typography variant="h5">
                    Meu histórico
                </Typography>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <MuiLink color="inherit" component={Link} to="/">
                        Home
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="#">
                        Histórico
                    </MuiLink>
                </Breadcrumbs>
            </div>
            <div>
                {isLoading || (
                    <Paper variant="outlined">
                        {historyList.length > 0 ? (
                            <>
                                <div className={classes.paperHeader}>
                                    <Typography variant="h6">
                                        Histórico
                                    </Typography>
                                    <Tooltip title="Mais opções">
                                        <IconButton aria-label="more">
                                            <MoreHorizIcon fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <Divider/>
                                <div>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Data</TableCell>
                                                <TableCell>Produto</TableCell>
                                                <TableCell>Funcionário</TableCell>
                                                <TableCell>Cliente</TableCell>
                                                <TableCell>Valor</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {historyList.map(history => (
                                                <TableRow key={history.id} hover>
                                                    <TableCell>{moment(history.created_at).format("DD/MM/YYYY - HH:MM")}</TableCell>
                                                    <TableCell>{history.product || 'Pontuação'}</TableCell>
                                                    <TableCell>{history.employee}</TableCell>
                                                    <TableCell>{history.client}</TableCell>
                                                    <TableCell>{history.amount}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 100]}
                                    component="div"
                                    count={historyList.length - 1}
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
                            <div className={classes.noHistory}>
                                <Container>
                                    <img src={VoidSvg} width="250"/>
                                    <Typography variant="h6" className={classes.noHistoryMg}>
                                        Sem registros de histórico.
                                    </Typography>
                                </Container>
                            </div>
                        )}
                    </Paper>
                )}
            </div>
        </div>
    )
};

export default History;
