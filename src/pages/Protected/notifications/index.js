import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { Typography, Breadcrumbs, Table, TableHead, TableBody, TableCell, Paper, TableRow, Badge, Link as MuiLink, Container } from '@material-ui/core';
import { UserService } from '../../../Services';
import { Backdrop, Snackbar, Pagination } from '../../../Components'
import { Styles } from './notifications.elements';
import { EmptySvg } from '../../../Assets';

const Notifications = () => {
    const [notificationList, setNotificationList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toggleFailureSnack, setToggleFailureSnack] = useState(false);
    const [infoMsg, setInfoMsg] = useState('');
    const [page, setPage] = useState(1);
    const [item, setItem] = useState(10);
    const [lastPage, setLastPage] = useState(null);
    const classes = Styles();


    useEffect(() => {
        fetchData(page, item);
    }, []);

    const fetchData = async (currentPage, rowsPerPage) => {
        try {
            const { data } = await UserService.notificationList(currentPage, rowsPerPage);
            console.log(data)
            setPage(data.current_page)
            setItem(data.per_page)
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
                <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                    <MuiLink color="inherit" component={Link} to="/">
                        Home
                    </MuiLink>
                    <MuiLink color="inherit" component={Link} to="#">
                        Notificações
                    </MuiLink>
                </Breadcrumbs>
            </div>
            {isLoading || (
                <div>
                    {notificationList.length > 0 ? (
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
                                <Pagination rows={item} changeRows={(e) => fetchData(page, e.target.value)} count={lastPage} changePage={(e, page) => fetchData(page, item)}/>
                            </Paper>
                        </div>
                    ) : (
                        <div className={classes.noContent}>
                        <Container>
                            <img src={EmptySvg} width="250"/>
                            <Typography variant="h6" className={classes.noContentMsg}>
                                Você não possui notificações.
                            </Typography>
                        </Container>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Notifications;