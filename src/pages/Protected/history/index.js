import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Link as MuiLink, Breadcrumbs, Typography, IconButton, Paper, Tooltip, Divider, Table, TableHead, TableBody, TableRow, TableCell, Container } from '@material-ui/core';
import { NavigateNext, MoreHoriz } from '@material-ui/icons';
import { VoidSvg } from '../../../Assets'
import { Snackbar, Pagination, Backdrop } from '../../../Components';
import { UserService } from '../../../Services';
import { Styles } from './history.elements';

function History() {
    const classes = Styles();
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
            <Backdrop open={isLoading}/>
            <div className={classes.header}>
                <Typography variant="h5">
                    Meu histórico
                </Typography>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
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
                                            <MoreHoriz fontSize="large" />
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
                                    <Pagination rows={item} changeRows={(e) => fetchData(page, e.target.value)} count={lastPage} changePage={(e, page) => fetchData(page, item)}/>
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
