import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Link as MuiLink, Breadcrumbs, Typography, IconButton, Paper, Tooltip, Divider, Table, TableHead, TableBody, TableRow, TableCell, Container } from '@material-ui/core';
import { NavigateNext, MoreHoriz, SettingsBackupRestore } from '@material-ui/icons';
import { VoidSvg } from '../../../Assets'
import { Snackbar, Pagination, Backdrop, ActionDialog } from '../../../Components';
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
    const [selectedId, setSelectedId] = useState(null);
    const [toggleActionDialog, setToggleActionDialog] = useState(false);
    const [reference, setReference] = useState('')

    useEffect(() => {
        fetchData(page, item);
    }, []);

    const fetchData = async (currentPage, rowsPerPage) => {
        try {
            const historyRes = await UserService.getUserHistory(currentPage, rowsPerPage); 
            console.log(historyRes.data)
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

    const setAndOpen = (id) => {
        setSelectedId(id);
        setToggleActionDialog(true)
    }

    const reverseHistory = async () => {
        setToggleActionDialog(false)
        setIsLoading(true)
        const data = {
            history_id: selectedId,
            reference: reference
        }
        console.log(data)
        try {
            await UserService.deleteHistory(data)
            await fetchData(page, item)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Snackbar toggleSnack={toggleFailureSnack} time={4000} color="warning">
                Ocorreu um erro ao carregar os dados, tente novamente mais tarde.
            </Snackbar>
            <Backdrop open={isLoading}/>
            <ActionDialog inputValue={reference} parentCallback={(reference) => setReference(reference)} inputActive inputLabel="Motivo" title="Reverter Pontuação" text="Ao realizar esta ação ela não poderá ser revertida" open={toggleActionDialog} close={() => setToggleActionDialog(false)} action={reverseHistory}/>
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
                                                <TableCell>Referência</TableCell>
                                                <TableCell>Transação</TableCell>
                                                <TableCell>Funcionário</TableCell>
                                                <TableCell>Cliente</TableCell>
                                                <TableCell>Valor</TableCell>
                                                <TableCell align='right'>Ações</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {historyList.map(history => (
                                                <TableRow key={history.id} hover>
                                                    <TableCell>{moment(history.created_at).format("DD/MM/YYYY - HH:MM")}</TableCell>
                                                    <TableCell>{history.product || '---'}</TableCell>
                                                    <TableCell>{history.transaction}</TableCell>
                                                    <TableCell>{history.reference}</TableCell>
                                                    <TableCell>{history.employee}</TableCell>
                                                    <TableCell>{history.client}</TableCell>
                                                    <TableCell>{history.amount}</TableCell>
                                                    <TableCell align='right'>
                                                        {history.reference  === "COMPRA" && (
                                                            <>
                                                            {history.reversed === 0 && (
                                                                    <Tooltip title="Remover" arrow>
                                                                        <IconButton onClick={() => setAndOpen(history.id)}>
                                                                            <SettingsBackupRestore color='secondary'/>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                            )}
                                                            </>
                                                        )}
                                                    </TableCell>
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
