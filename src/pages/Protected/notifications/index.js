import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import {
    Typography,
    Breadcrumbs,
    Table,
    TableHead,
    TableBody,
    TableCell,
    Paper,
    TableRow,
    Badge,
    Grid,
    CircularProgress,
    TablePagination,
    IconButton,
    useTheme,
    Link as MuiLink
} from '@material-ui/core';
import { useStyles } from './NotificationsElements';
import { UserService } from '../../../Services';
import { Backdrop, Snackbar } from '../../../Components'

const Notifications = () => {
    const [notificationList, setNotificationList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const [page, setPage] = useState(1);
    const [item, setItem] = useState(10);
    const [lastPage, setLastPage] = useState(null);
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        fetchData(page, item);
    }, []);

    const fetchData = async (currentPage, rowsPerPage) => {
        try {
            const { data } = await UserService.notificationList(currentPage, rowsPerPage);
            console.log(data)
            setLastPage(data.last_page)
            setNotificationList(data.data)
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            setInfoMsg('Ocorreu um erro ao se comunicar com o servidor, tente novamente mais tarde');
            setToggleFailureSnack(true);
        }
    }

    return (
        <div>   
            <Backdrop open={isLoading}/>
            <Snackbar toggleSnack={toggleFailureSnack} time={4000} color="warning">
                {infoMsg}
            </Snackbar>
            <div className={classes.header}>
                <Typography variant="h5">Notificações</Typography>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <MuiLink color="inherit" component={Link} to="/">
                        Home
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="#">
                        Notificações
                    </MuiLink>
                </Breadcrumbs>
            </div>
            <div>
                <Paper variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Titulo</TableCell>
                                <TableCell>Mensagem</TableCell>
                                <TableCell>Data</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notificationList.map(notification => (
                                <TableRow key={notification.id}>
                                    <TableCell>
                                        {notification.read === 0 && (
                                            <Badge color="primary" overlap="circle" variant="dot" style={{marginRight: '45px', zIndex: '0'}}></Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>{notification.title}</TableCell>
                                    <TableCell>{notification.message}</TableCell>
                                    <TableCell>{moment(notification.created_at).format("DD/MM/YYYY - HH:MM")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={notificationList.length - 1}
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
                </Paper>
            </div>
        </div>
    )
}

export default Notifications;